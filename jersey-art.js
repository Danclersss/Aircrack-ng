'use strict';
// A reusable, mark-free shirt silhouette. Kit profiles describe colors and
// stripe layout; no club crests, sponsors or manufacturer marks are rendered.
window.FutBRKits={
 serial:0,
 svg({primary='#202327',secondary='#ffffff',pattern='plain',tertiary=null,number=null,numberColor=null}={}){
  const valid=c=>typeof c==='string'&&/^#[0-9a-f]{6}$/i.test(c);
  primary=valid(primary)?primary:'#202327';secondary=valid(secondary)?secondary:'#ffffff';tertiary=valid(tertiary)?tertiary:secondary;
  const white='#ffffff';const path='M28 12 40 8Q50 15 60 8L72 12 93 31 80 47 70 40 72 91Q50 96 28 91L30 40 20 47 7 31Z';
  let fabric='';
  if(pattern==='vertical')fabric=`<path d="M35 8H45V95H35ZM55 8H65V95H55Z" fill="${secondary}"/>`;
  else if(pattern==='horizontal')fabric=`<path d="M0 24H100V36H0ZM0 49H100V61H0ZM0 75H100V87H0Z" fill="${secondary}"/>`;
  else if(pattern==='sash')fabric=`<path d="M10 90 23 100 88 15 74 5Z" fill="${secondary}"/>`;
  else if(pattern==='chest')fabric=`<path d="M20 34H80V42H20Z" fill="${secondary}"/><path d="M20 45H80V53H20Z" fill="${tertiary}"/>`;
  else if(pattern==='sleeves')fabric=`<path d="M0 0H30V48H0ZM70 0H100V48H70Z" fill="${secondary}"/>`;
  else if(pattern==='tricolor')fabric=`<path d="M31 8H42V95H31Z" fill="${secondary}"/><path d="M45 8H55V95H45Z" fill="${white}"/><path d="M58 8H69V95H58Z" fill="${secondary}"/>`;
  else if(pattern==='halves')fabric=`<path d="M50 0h50v100H50Z" fill="${secondary}"/>`;
  else if(pattern==='center')fabric=`<path d="M39 0h22v100H39Z" fill="${secondary}"/>`;
  else if(pattern==='hoops')fabric=`<path d="M0 29h100m-100 14h100M0 57h100M0 71h100M0 85h100" stroke="${secondary}" stroke-width="5"/>`;
  else if(pattern==='pinstripe')fabric=`<path d="M34 8v90M42 8v90M50 8v90M58 8v90M66 8v90" stroke="${secondary}" stroke-width="2"/>`;
  else if(pattern==='chevron')fabric=`<path d="M19 25 50 43 81 25v11L50 55 19 36Z" fill="${secondary}"/>`;
  const clipId='futbr-shirt-'+(++this.serial);
  const label=Number.isInteger(number)&&number>0&&number<100?String(number):'—';
  if(!valid(numberColor)){const rgb=primary.slice(1).match(/../g).map(x=>parseInt(x,16)/255);numberColor=rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722>.57?'#17221a':'#ffffff'}
  return `<svg class="jersey-svg" viewBox="0 0 100 100" role="img" aria-label="Camisa ${label==='—'?'sem número confirmado':'número '+label}"><defs><clipPath id="${clipId}"><path d="${path}"/></clipPath></defs><path d="${path}" fill="${primary}" stroke="#ffffffbb" stroke-width="1.2"/><g clip-path="url(#${clipId})">${fabric}</g><path d="M40 9Q50 23 60 9" fill="none" stroke="${secondary}" stroke-width="4"/><path d="M13 35 22 42M78 42 87 35" stroke="${secondary}" stroke-width="3"/><path d="M30 42 28 90M70 42 72 90" fill="none" stroke="#00000015" stroke-width="1.3"/><rect class="shirt-number-panel" x="27" y="40" width="46" height="37" rx="5" fill="${numberColor==='#ffffff'?'#17221a':'#ffffff'}" fill-opacity=".96"/><text x="50" y="71" text-anchor="middle" font-size="38" font-family="Arial,sans-serif" font-weight="900" fill="${numberColor}" stroke="${numberColor==='#ffffff'?'#00000080':'#ffffffbb'}" stroke-width="1.6" paint-order="stroke">${label}</text></svg>`
 }
};
