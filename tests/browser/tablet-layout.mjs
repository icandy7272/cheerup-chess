// Run against a local preview, or set BASE_URL to verify a deployment.
// PLAYWRIGHT_MODULE may point to an existing Playwright installation.
import assert from 'node:assert/strict';
import {puzzles} from '../../src/content.js';
import {createPosition} from '../../src/position.js';
const engines=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await engines[process.env.BROWSER||'chromium'].launch({headless:true});
const base=(process.env.BASE_URL||'http://127.0.0.1:5174').replace(/\/$/,'');
const sizes=[[1024,600],[1024,680],[1180,700],[1366,860],[768,900],[820,1000]];
const inside=async(page,selector)=>{
 const box=await page.locator(selector).boundingBox(),{width,height}=page.viewportSize();
 assert.ok(box&&box.x>=-1&&box.y>=-1&&box.x+box.width<=width+1&&box.y+box.height<=height+1,`${selector} outside ${width}x${height}: ${JSON.stringify(box)}`);
};
async function solve(page,puzzle){
 const chess=createPosition(puzzle),side=chess.turn();
 for(let i=0;i<puzzle.lines[0].length;i++){
  const move=chess.move(puzzle.lines[0][i]);if(i%2)continue;
  for(const square of [move.from,move.to]){
   const box=await page.locator('#board').boundingBox(),file=square.charCodeAt(0)-97,rank=Number(square[1]);
   await page.touchscreen.tap(box.x+((side==='w'?file:7-file)+.5)*box.width/8,box.y+((side==='w'?8-rank:rank-1)+.5)*box.height/8);
  }
  if(move.promotion)await page.locator(`[data-promote="${move.promotion}"]`).tap();
  await page.clock.runFor(2400);
  assert.equal(await page.locator('.move-cell.fail').count(),0);
 }
 await page.locator('#next').waitFor();
}
try{
 for(const [width,height] of sizes){
  const page=await browser.newPage({viewport:{width,height},isMobile:true,hasTouch:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.clock.install();
  // This regression uses only redistributable original exercises.
  await page.route('**/site-data/puzzles.json',r=>r.fulfill({json:{puzzles:[]}}));
  await page.goto(`${base}/#play/original-1-1`);await page.locator('cg-board').waitFor();
  await inside(page,'#board');await inside(page,'#hint');await inside(page,'.instruction');
  const initial=await page.locator('#board').boundingBox();
  await solve(page,puzzles.find(p=>p.id==='original-1-1'));
  await inside(page,'#board');await inside(page,'#next');await inside(page,'#again');
  assert.deepEqual(await page.locator('#board').boundingBox(),initial,'board moved on completion');
  await page.locator('#next').tap();await page.waitForURL('**/#play/original-1-2');await page.locator('#hint').waitFor();
  await inside(page,'#board');await inside(page,'#hint');
  assert.deepEqual(await page.locator('#board').boundingBox(),initial,'board moved on next puzzle');
  // Hints and long move histories must never displace the action area.
  await page.locator('#hint').tap();await inside(page,'#hint');
  await page.goto(`${base}/#play/original-15-1`);await page.locator('cg-board').waitFor();
  await solve(page,puzzles.find(p=>p.id==='original-15-1'));
  await inside(page,'#next');await inside(page,'#board');
  await page.locator('.coach-content').evaluate(e=>e.scrollTop=e.scrollHeight);
  await inside(page,'#next');
  await page.setViewportSize({width:Math.max(768,height),height:Math.max(600,width)});await page.clock.runFor(100);
  await inside(page,'#board');await inside(page,'#next');
  assert.equal(await page.evaluate(()=>scrollY===0&&document.documentElement.scrollHeight<=innerHeight+1&&document.documentElement.scrollWidth<=innerWidth+1),true,'document needs scrolling');
  await page.locator('#next').tap();await page.waitForURL('**/#play/original-15-2');await page.locator('#hint').waitFor();await inside(page,'#board');await inside(page,'#hint');
  await page.getByRole('button',{name:'战术地图',exact:true}).tap();await page.locator('.hero').waitFor();
  assert.equal(await page.locator('.play-shell').count(),0,'practice layout leaked to map');
  assert.deepEqual(errors,[]);await page.close();
  console.log(`${process.env.BROWSER||'chromium'} ${width}x${height}: touch moves, complete/next, long history, rotate, exit passed`);
 }
}finally{await browser.close();}
