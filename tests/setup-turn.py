#!/usr/bin/env python3
"""Install a verified, loopback-only test prerequisite under /tmp (Debian 13).

No system policy, package database, browser settings or TLS checks are changed.
The PvP test starts and stops the relay itself; this does not host a public TURN.
"""
import hashlib
import json
import lzma
import os
from pathlib import Path
import re
import subprocess
import tempfile
import urllib.request

ROOT = Path('/tmp/futbr-coturn')
MANIFEST = ROOT / '.verified-files.json'
KEYRING = Path('/usr/share/keyrings/debian-archive-keyring.gpg')
PACKAGES = ['coturn', 'libhiredis1.1.0', 'libevent-extra-2.1-7t64', 'libevent-openssl-2.1-7t64']
BASE = 'https://deb.debian.org/debian/'


def sha(data):
    return hashlib.sha256(data).hexdigest()


def fetch(path):
    with urllib.request.urlopen(BASE + path, timeout=60) as response:
        return response.read()


def main():
    if MANIFEST.exists():
        previous = json.loads(MANIFEST.read_text())
        if previous and all((ROOT / name).is_file() and sha((ROOT / name).read_bytes()) == digest
                            for name, digest in previous.items()):
            print('TURN de teste: cache verificado em', ROOT)
            return
    if not KEYRING.exists():
        raise RuntimeError('Este auxiliar requer o chaveiro Debian. Em outros sistemas, instale coturn e use FUTBR_TEST_TURN_BINARY.')
    ROOT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='futbr-turn-verify-') as scratch:
        work = Path(scratch)
        release = fetch('dists/trixie/InRelease')
        (work / 'InRelease').write_bytes(release)
        gpg_home = work / 'gpg'
        gpg_home.mkdir(mode=0o700)
        verified = subprocess.run(['gpg', '--no-options', '--homedir', str(gpg_home),
                                   '--no-default-keyring', '--keyring', str(KEYRING),
                                   '--status-fd', '1', '--verify', str(work / 'InRelease')],
                                  capture_output=True, text=True, check=True)
        if '[GNUPG:] VALIDSIG ' not in verified.stdout:
            raise RuntimeError('A assinatura do índice Debian não foi confirmada.')
        expected = re.search(rb'^ ([0-9a-f]{64})\s+\d+ main/binary-amd64/Packages.xz$',
                             release, re.M).group(1).decode()
        compressed = fetch('dists/trixie/main/binary-amd64/Packages.xz')
        if sha(compressed) != expected:
            raise RuntimeError('O checksum do índice Debian não confere.')
        records = {}
        for paragraph in lzma.decompress(compressed).decode().split('\n\n'):
            fields = dict(line.split(': ', 1) for line in paragraph.splitlines()
                          if ': ' in line and not line.startswith(' '))
            if fields.get('Package') in PACKAGES:
                records[fields['Package']] = fields
        if len(records) != len(PACKAGES):
            raise RuntimeError('O índice não contém todos os pacotes necessários.')
        for name in PACKAGES:
            record = records[name]
            package = fetch(record['Filename'])
            if sha(package) != record['SHA256']:
                raise RuntimeError('Checksum inválido: ' + name)
            path = work / (name + '.deb')
            path.write_bytes(package)
            subprocess.run(['dpkg-deb', '-x', str(path), str(ROOT)], check=True)
            print('Verificado:', name, record['Version'])
    binary = ROOT / 'usr/bin/turnserver'
    libraries = ROOT / 'usr/lib/x86_64-linux-gnu'
    environment = dict(os.environ, LD_LIBRARY_PATH=str(libraries))
    dependencies = subprocess.run(['ldd', str(binary)], env=environment, capture_output=True, text=True, check=True)
    if 'not found' in dependencies.stdout:
        raise RuntimeError('Dependência de coturn ausente: ' + dependencies.stdout)
    tracked = [binary, *libraries.glob('*.so*')]
    MANIFEST.write_text(json.dumps({str(p.relative_to(ROOT)): sha(p.read_bytes())
                                    for p in tracked if p.is_file()}, indent=2) + '\n')
    print('TURN de teste pronto. O teste PvP usa apenas 127.0.0.1.')


if __name__ == '__main__':
    main()
