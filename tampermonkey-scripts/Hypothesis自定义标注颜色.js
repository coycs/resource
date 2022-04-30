// ==UserScript==
// @name         Hypothesis自定义标注颜色和透明度
// @namespace    https://coycs.com/
// @version      0.2.0
// @description  自定义标注颜色和透明度
// @author       coycs
// @match        http://*/*
// @match        https://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @license MIT
// ==/UserScript==

(function () {
  "use strict";
  // webhook同步测试
  console.log("webhook同步测试");
  window.onload = function () {
    let color, transparency, font_color;
    color = getValue("H_color");
    transparency = getValue("H_transparency");
    font_color = getValue("H_font_color");
    // 设置样式
    setStyle();
    // 注册脚本菜单
    GM_registerMenuCommand("自定义标注颜色和透明度", prompts, "h");
    // 弹出对话框
    function prompts() {
      // 获取自定义值
      let p_color = prompt("请输入背景色RGB值（用英文逗号分隔）", color);
      let p_transparency = prompt("请输入背景色透明度", transparency);
      let p_font_color = prompt("请输入字体颜色", font_color);
      color=!p_color?color:p_color;
      transparency=!p_transparency?transparency:p_transparency;
      font_color=!p_font_color?font_color:p_font_color;
      // 保存自定义值
      GM_setValue("H_color", color);
      GM_setValue("H_transparency", transparency);
      GM_setValue("H_font_color", font_color);
      setStyle();
    }
    function setStyle() {
      let style = document.createElement("style");
      style.type = "text/css";
      style.innerHTML = `.hypothesis-highlights-always-on .hypothesis-highlight {
      background-color: rgba(${color},${transparency}) !important;
      color: ${font_color} !important;
    }`;
      document.getElementsByTagName("head").item(0).appendChild(style);
    }
    // 封装GM_getValue，解决为Null的问题
    function getValue(ag) {
      if (ag == "H_color") {
        return (color = !GM_getValue("H_color") ? "17,153,142" : GM_getValue("H_color"));
      }
      if (ag == "H_transparency") {
        return (transparency = !GM_getValue("H_transparency")
          ? 0.4
          : GM_getValue("H_transparency"));
      }
      if (ag == "H_font_color") {
        return (font_color = !GM_getValue("H_font_color")
          ? "#000"
          : GM_getValue("H_font_color"));
      }
    }
  };
})();
