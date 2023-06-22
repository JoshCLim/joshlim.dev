import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

interface Note {
  id: string;
  name: string;
  html: string;
  public: boolean;
  description: string;
  nextId?: string;
  course: string;
}

const NOTES: Note[] = [
  {
    id: "comp2521_01",
    name: "1.1 Introduction and COMP1511 Code Gap",
    description:
      "Introduction to COMP2521 and some C knowledge to get you up to speed.",
    html: `<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>introduction + COMP1511 gap</title><style>
/* cspell:disable-file */
/* webkit printing magic: print all background colors */
html {
	-webkit-print-color-adjust: exact;
}
* {
	box-sizing: border-box;
	-webkit-print-color-adjust: exact;
}

html,
body {
	margin: 0;
	padding: 0;
}
@media only screen {
	body {
		margin: 2em auto;
		max-width: 900px;
		color: rgb(55, 53, 47);
	}
}

body {
	line-height: 1.5;
	white-space: pre-wrap;
}

a,
a.visited {
	color: inherit;
	text-decoration: underline;
}

.pdf-relative-link-path {
	font-size: 80%;
	color: #444;
}

h1,
h2,
h3 {
	letter-spacing: -0.01em;
	line-height: 1.2;
	font-weight: 600;
	margin-bottom: 0;
}

.page-title {
	font-size: 2.5rem;
	font-weight: 700;
	margin-top: 0;
	margin-bottom: 0.75em;
}

h1 {
	font-size: 1.875rem;
	margin-top: 1.875rem;
}

h2 {
	font-size: 1.5rem;
	margin-top: 1.5rem;
}

h3 {
	font-size: 1.25rem;
	margin-top: 1.25rem;
}

.source {
	border: 1px solid #ddd;
	border-radius: 3px;
	padding: 1.5em;
	word-break: break-all;
}

.callout {
	border-radius: 3px;
	padding: 1rem;
}

figure {
	margin: 1.25em 0;
	page-break-inside: avoid;
}

figcaption {
	opacity: 0.5;
	font-size: 85%;
	margin-top: 0.5em;
}

mark {
	background-color: transparent;
}

.indented {
	padding-left: 1.5em;
}

hr {
	background: transparent;
	display: block;
	width: 100%;
	height: 1px;
	visibility: visible;
	border: none;
	border-bottom: 1px solid rgba(55, 53, 47, 0.09);
}

img {
	max-width: 100%;
}

@media only print {
	img {
		max-height: 100vh;
		object-fit: contain;
	}
}

@page {
	margin: 1in;
}

.collection-content {
	font-size: 0.875rem;
}

.column-list {
	display: flex;
	justify-content: space-between;
}

.column {
	padding: 0 1em;
}

.column:first-child {
	padding-left: 0;
}

.column:last-child {
	padding-right: 0;
}

.table_of_contents-item {
	display: block;
	font-size: 0.875rem;
	line-height: 1.3;
	padding: 0.125rem;
}

.table_of_contents-indent-1 {
	margin-left: 1.5rem;
}

.table_of_contents-indent-2 {
	margin-left: 3rem;
}

.table_of_contents-indent-3 {
	margin-left: 4.5rem;
}

.table_of_contents-link {
	text-decoration: none;
	opacity: 0.7;
	border-bottom: 1px solid rgba(55, 53, 47, 0.18);
}

table,
th,
td {
	border: 1px solid rgba(55, 53, 47, 0.09);
	border-collapse: collapse;
}

table {
	border-left: none;
	border-right: none;
}

th,
td {
	font-weight: normal;
	padding: 0.25em 0.5em;
	line-height: 1.5;
	min-height: 1.5em;
	text-align: left;
}

th {
	color: rgba(55, 53, 47, 0.6);
}

ol,
ul {
	margin: 0;
	margin-block-start: 0.6em;
	margin-block-end: 0.6em;
}

li > ol:first-child,
li > ul:first-child {
	margin-block-start: 0.6em;
}

ul > li {
	list-style: disc;
}

ul.to-do-list {
	padding-inline-start: 0;
}

ul.to-do-list > li {
	list-style: none;
}

.to-do-children-checked {
	text-decoration: line-through;
	opacity: 0.375;
}

ul.toggle > li {
	list-style: none;
}

ul {
	padding-inline-start: 1.7em;
}

ul > li {
	padding-left: 0.1em;
}

ol {
	padding-inline-start: 1.6em;
}

ol > li {
	padding-left: 0.2em;
}

.mono ol {
	padding-inline-start: 2em;
}

.mono ol > li {
	text-indent: -0.4em;
}

.toggle {
	padding-inline-start: 0em;
	list-style-type: none;
}

/* Indent toggle children */
.toggle > li > details {
	padding-left: 1.7em;
}

.toggle > li > details > summary {
	margin-left: -1.1em;
}

.selected-value {
	display: inline-block;
	padding: 0 0.5em;
	background: rgba(206, 205, 202, 0.5);
	border-radius: 3px;
	margin-right: 0.5em;
	margin-top: 0.3em;
	margin-bottom: 0.3em;
	white-space: nowrap;
}

.collection-title {
	display: inline-block;
	margin-right: 1em;
}

.page-description {
    margin-bottom: 2em;
}

.simple-table {
	margin-top: 1em;
	font-size: 0.875rem;
	empty-cells: show;
}
.simple-table td {
	height: 29px;
	min-width: 120px;
}

.simple-table th {
	height: 29px;
	min-width: 120px;
}

.simple-table-header-color {
	background: rgb(247, 246, 243);
	color: black;
}
.simple-table-header {
	font-weight: 500;
}

time {
	opacity: 0.5;
}

.icon {
	display: inline-block;
	max-width: 1.2em;
	max-height: 1.2em;
	text-decoration: none;
	vertical-align: text-bottom;
	margin-right: 0.5em;
}

img.icon {
	border-radius: 3px;
}

.user-icon {
	width: 1.5em;
	height: 1.5em;
	border-radius: 100%;
	margin-right: 0.5rem;
}

.user-icon-inner {
	font-size: 0.8em;
}

.text-icon {
	border: 1px solid #000;
	text-align: center;
}

.page-cover-image {
	display: block;
	object-fit: cover;
	width: 100%;
	max-height: 30vh;
}

.page-header-icon {
	font-size: 3rem;
	margin-bottom: 1rem;
}

.page-header-icon-with-cover {
	margin-top: -0.72em;
	margin-left: 0.07em;
}

.page-header-icon img {
	border-radius: 3px;
}

.link-to-page {
	margin: 1em 0;
	padding: 0;
	border: none;
	font-weight: 500;
}

p > .user {
	opacity: 0.5;
}

td > .user,
td > time {
	white-space: nowrap;
}

input[type="checkbox"] {
	transform: scale(1.5);
	margin-right: 0.6em;
	vertical-align: middle;
}

p {
	margin-top: 0.5em;
	margin-bottom: 0.5em;
}

.image {
	border: none;
	margin: 1.5em 0;
	padding: 0;
	border-radius: 0;
	text-align: center;
}

.code,
code {
	background: rgba(135, 131, 120, 0.15);
	border-radius: 3px;
	padding: 0.2em 0.4em;
	border-radius: 3px;
	font-size: 85%;
	tab-size: 2;
}

code {
	color: #eb5757;
}

.code {
	padding: 1.5em 1em;
}

.code-wrap {
	white-space: pre-wrap;
	word-break: break-all;
}

.code > code {
	background: none;
	padding: 0;
	font-size: 100%;
	color: inherit;
}

blockquote {
	font-size: 1.25em;
	margin: 1em 0;
	padding-left: 1em;
	border-left: 3px solid rgb(55, 53, 47);
}

.bookmark {
	text-decoration: none;
	max-height: 8em;
	padding: 0;
	display: flex;
	width: 100%;
	align-items: stretch;
}

.bookmark-title {
	font-size: 0.85em;
	overflow: hidden;
	text-overflow: ellipsis;
	height: 1.75em;
	white-space: nowrap;
}

.bookmark-text {
	display: flex;
	flex-direction: column;
}

.bookmark-info {
	flex: 4 1 180px;
	padding: 12px 14px 14px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.bookmark-image {
	width: 33%;
	flex: 1 1 180px;
	display: block;
	position: relative;
	object-fit: cover;
	border-radius: 1px;
}

.bookmark-description {
	color: rgba(55, 53, 47, 0.6);
	font-size: 0.75em;
	overflow: hidden;
	max-height: 4.5em;
	word-break: break-word;
}

.bookmark-href {
	font-size: 0.75em;
	margin-top: 0.25em;
}

.sans { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"; }
.code { font-family: "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace; }
.serif { font-family: Lyon-Text, Georgia, ui-serif, serif; }
.mono { font-family: iawriter-mono, Nitti, Menlo, Courier, monospace; }
.pdf .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK JP'; }
.pdf:lang(zh-CN) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK SC'; }
.pdf:lang(zh-TW) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK TC'; }
.pdf:lang(ko-KR) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK KR'; }
.pdf .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK JP'; }
.pdf:lang(zh-CN) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK SC'; }
.pdf:lang(zh-TW) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK TC'; }
.pdf:lang(ko-KR) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK KR'; }
.pdf .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK JP'; }
.pdf:lang(zh-CN) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK SC'; }
.pdf:lang(zh-TW) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK TC'; }
.pdf:lang(ko-KR) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK KR'; }
.pdf .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK JP'; }
.pdf:lang(zh-CN) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK SC'; }
.pdf:lang(zh-TW) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK TC'; }
.pdf:lang(ko-KR) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK KR'; }
.highlight-default {
	color: rgba(55, 53, 47, 1);
}
.highlight-gray {
	color: rgba(120, 119, 116, 1);
	fill: rgba(120, 119, 116, 1);
}
.highlight-brown {
	color: rgba(159, 107, 83, 1);
	fill: rgba(159, 107, 83, 1);
}
.highlight-orange {
	color: rgba(217, 115, 13, 1);
	fill: rgba(217, 115, 13, 1);
}
.highlight-yellow {
	color: rgba(203, 145, 47, 1);
	fill: rgba(203, 145, 47, 1);
}
.highlight-teal {
	color: rgba(68, 131, 97, 1);
	fill: rgba(68, 131, 97, 1);
}
.highlight-blue {
	color: rgba(51, 126, 169, 1);
	fill: rgba(51, 126, 169, 1);
}
.highlight-purple {
	color: rgba(144, 101, 176, 1);
	fill: rgba(144, 101, 176, 1);
}
.highlight-pink {
	color: rgba(193, 76, 138, 1);
	fill: rgba(193, 76, 138, 1);
}
.highlight-red {
	color: rgba(212, 76, 71, 1);
	fill: rgba(212, 76, 71, 1);
}
.highlight-gray_background {
	background: rgba(241, 241, 239, 1);
}
.highlight-brown_background {
	background: rgba(244, 238, 238, 1);
}
.highlight-orange_background {
	background: rgba(251, 236, 221, 1);
}
.highlight-yellow_background {
	background: rgba(251, 243, 219, 1);
}
.highlight-teal_background {
	background: rgba(237, 243, 236, 1);
}
.highlight-blue_background {
	background: rgba(231, 243, 248, 1);
}
.highlight-purple_background {
	background: rgba(244, 240, 247, 0.8);
}
.highlight-pink_background {
	background: rgba(249, 238, 243, 0.8);
}
.highlight-red_background {
	background: rgba(253, 235, 236, 1);
}
.block-color-default {
	color: inherit;
	fill: inherit;
}
.block-color-gray {
	color: rgba(120, 119, 116, 1);
	fill: rgba(120, 119, 116, 1);
}
.block-color-brown {
	color: rgba(159, 107, 83, 1);
	fill: rgba(159, 107, 83, 1);
}
.block-color-orange {
	color: rgba(217, 115, 13, 1);
	fill: rgba(217, 115, 13, 1);
}
.block-color-yellow {
	color: rgba(203, 145, 47, 1);
	fill: rgba(203, 145, 47, 1);
}
.block-color-teal {
	color: rgba(68, 131, 97, 1);
	fill: rgba(68, 131, 97, 1);
}
.block-color-blue {
	color: rgba(51, 126, 169, 1);
	fill: rgba(51, 126, 169, 1);
}
.block-color-purple {
	color: rgba(144, 101, 176, 1);
	fill: rgba(144, 101, 176, 1);
}
.block-color-pink {
	color: rgba(193, 76, 138, 1);
	fill: rgba(193, 76, 138, 1);
}
.block-color-red {
	color: rgba(212, 76, 71, 1);
	fill: rgba(212, 76, 71, 1);
}
.block-color-gray_background {
	background: rgba(241, 241, 239, 1);
}
.block-color-brown_background {
	background: rgba(244, 238, 238, 1);
}
.block-color-orange_background {
	background: rgba(251, 236, 221, 1);
}
.block-color-yellow_background {
	background: rgba(251, 243, 219, 1);
}
.block-color-teal_background {
	background: rgba(237, 243, 236, 1);
}
.block-color-blue_background {
	background: rgba(231, 243, 248, 1);
}
.block-color-purple_background {
	background: rgba(244, 240, 247, 0.8);
}
.block-color-pink_background {
	background: rgba(249, 238, 243, 0.8);
}
.block-color-red_background {
	background: rgba(253, 235, 236, 1);
}
.select-value-color-pink { background-color: rgba(245, 224, 233, 1); }
.select-value-color-purple { background-color: rgba(232, 222, 238, 1); }
.select-value-color-green { background-color: rgba(219, 237, 219, 1); }
.select-value-color-gray { background-color: rgba(227, 226, 224, 1); }
.select-value-color-translucentGray { background-color: rgba(255, 255, 255, 0.0375); }
.select-value-color-orange { background-color: rgba(250, 222, 201, 1); }
.select-value-color-brown { background-color: rgba(238, 224, 218, 1); }
.select-value-color-red { background-color: rgba(255, 226, 221, 1); }
.select-value-color-yellow { background-color: rgba(253, 236, 200, 1); }
.select-value-color-blue { background-color: rgba(211, 229, 239, 1); }

.checkbox {
	display: inline-flex;
	vertical-align: text-bottom;
	width: 16;
	height: 16;
	background-size: 16px;
	margin-left: 2px;
	margin-right: 5px;
}

.checkbox-on {
	background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%2358A9D7%22%2F%3E%0A%3Cpath%20d%3D%22M6.71429%2012.2852L14%204.9995L12.7143%203.71436L6.71429%209.71378L3.28571%206.2831L2%207.57092L6.71429%2012.2852Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E");
}

.checkbox-off {
	background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20fill%3D%22white%22%20stroke%3D%22%2336352F%22%20stroke-width%3D%221.5%22%2F%3E%0A%3C%2Fsvg%3E");
}
	
</style></head><body><article id="b86addaf-dd9a-440f-942f-c7c19ff5bd8d" class="page sans"><header><div class="page-header-icon undefined"><img class="icon" src="https://www.notion.so/icons/playback-play-button_green.svg"/></div><h1 class="page-title">introduction + COMP1511 gap</h1><p class="page-description"></p></header><div class="page-body"><hr id="f541c7f5-d1a7-4da6-8d1b-e55d9bab05d5"/><h3 id="74ee404d-6e31-4469-a546-50bf71ed0689" class="">themes 🖼️</h3><p id="b3445606-1502-4efb-86b4-3b6d0fdefa0a" class="">from programmer → to computer scientist</p><ul id="05073b02-7125-4037-a871-316c4e3055ae" class="bulleted-list"><li style="list-style-type:disc">analyse performance characteristics of an algorithm or data structure</li></ul><ul id="490c7209-0caf-4220-ac40-3e6a7744b592" class="bulleted-list"><li style="list-style-type:disc">make decisions about appropriate data structures or algorithms</li></ul><p id="67b765b5-fa81-4e46-9215-614cd262330f" class="">thinking about engineering <strong>to scale </strong>— what if we have 1000 inputs? 1000000 inputs?</p><p id="ac3b5d2c-dfdf-42fe-9df3-a3cebb75644a" class="">
</p><hr id="d84e0409-a266-4f0b-9cba-2cd1447d57f2"/><h1 id="641b18c1-376b-4bb9-9547-cff7d009fbc8" class="">COMP1511 Gap</h1><h2 id="531e291f-ba10-4346-9fa8-b6c1178b9c92" class="">style 🎨</h2><p id="d97fe821-08de-4938-9594-7893625c5bd0" class="">some relaxation on style guide compared to COMP1511, but still required to follow the style guide</p><p id="e300609d-67b4-4a3f-915c-655d7aa06ffb" class="">
</p><p id="31a5bbf6-8d86-473f-adae-8c30e988c75a" class=""><code>e.g.</code> using assignment statements in expressions<div class="indented"><p id="ceacd60d-72b4-4ffa-8ed5-037bcc1196fd" class="">an assignment statement will return the value that is assigned</p></div></p><p id="42bfbc28-8e79-4017-8d40-51a05e956d79" class=""><code>e.g.</code> ternary operators<div class="indented"><p id="6f7a5a16-f499-4789-9d5f-937269851901" class="">x = c ? e1 : e2;</p><p id="2e9a8724-cd2e-413f-be7f-84234021bae3" class="">(if c is true, x = e1; else, x = e2)</p></div></p><p id="a6de39e7-eb6c-4a90-85c9-df8f9db77af8" class=""><code>e.g.</code> ditch curly brackets if only one statement after <em>if</em><div class="indented"><pre id="1da2c7fb-3975-4d87-bfe3-92e5f312c6b3" class="code"><code>if (x &gt; 0)
	y = &#x27;yolo&#x27;;</code></pre></div></p><p id="97d244a6-3de1-4ed3-8ff5-e03672760d29" class=""><code>e.g.</code> using ternary operators in for loops<div class="indented"><pre id="12fe413a-cc24-47fc-9c96-de65079418ba" class="code"><code>for (int i = start; (start &lt;= end) ? i &lt;= end : i &gt;= end; i += step) { // do stuff }</code></pre></div></p><h2 id="44e188f6-ba6a-480f-9a4e-0b6dca915e46" class="">for loops 🔁</h2><p id="d5ca015b-10b4-4ab2-b297-38020ec3fa27" class="">another way to write loops in a more ‘compact’ way</p><p id="86af892e-8e5b-4607-905b-81fdf65f3d4e" class="block-color-purple"><mark class="highlight-purple"><code>for (init, condition, increment) {}</code></mark></p><p id="0cab4339-52e7-4d5f-bed9-5df3788e5216" class="">
</p><pre id="f458fe19-2112-422a-a3e4-ebd93fa34a09" class="code"><code>for (int i = 0; i &lt; 5; i++) {
	// do stuff
}</code></pre><h2 id="f4c3b79e-6ef0-4b6a-83b1-a4591f16dd14" class="">switch statements 🚥</h2><p id="84210413-8b7a-4891-9411-3550df9b4ea2" class="">another way to write conditionals when dealing with <span style="border-bottom:0.05em solid">equality comparisons</span> where one side is always the same</p><pre id="a287fdcc-37f3-4c31-98d5-9d9f095c0330" class="code"><code>switch (input) {
	case &#x27;A&#x27;:
		printf(&quot;You entered A&quot;);
		break;
	case &#x27;B&#x27;:
		printf(&quot;You entered B&quot;);
		break;
	default:
		printf(&quot;Please enter either A or B&quot;);
}</code></pre><p id="7197b111-b9df-4413-9dbf-8dcc6287e385" class="">
</p><ul id="555a2679-1a74-45af-a6c8-2e7306f7dd2a" class="toggle"><li><details open=""><summary>note: without the <mark class="highlight-teal"><code>break</code></mark> at the end of each case, the switch statement will run all of the code until it reaches a <mark class="highlight-teal"><code>break</code></mark> statement</summary><pre id="2cf18556-fa52-4832-971f-f5fa8442bc71" class="code"><code>// this code will print out &quot;Hello&quot; and &quot;Bye&quot;
char input = &#x27;A&#x27;;
switch (input) {
	case &#x27;A&#x27;:
		printf(&quot;Hello&quot;);
	case &#x27;B&#x27;:
		printf(&quot;Bye&quot;);
		break;
	case &#x27;C&#x27;:
		printf(&quot;Cya&quot;);
		break;
}</code></pre></details></li></ul><h2 id="c916481d-bb56-496a-80ea-b4938ff51dd2" class="">asserts ✊</h2><p id="0d8fff09-892d-4359-a7a4-2ae8c5bbae10" class="">using, <mark class="highlight-blue"><code>#include &lt;assert.h&gt;</code></mark>, we can include an <mark class="highlight-blue"><code>assert(condition)</code></mark> which will crash the program if the condition evaluates to <mark class="highlight-blue"><code>false</code></mark></p><pre id="cf565252-80cc-4f69-bef3-8e2dd2e57197" class="code"><code>#include &lt;assert.h&gt;

int is_even(int num) {
	if (num % 2 == 0) {
		return 1;
	}
	return 0;
}

void tests() {
	assert(is_even(2) == 1);
	assert(is_even(5) == 0);
}</code></pre><p id="55200de0-38b9-452e-a967-17f41c5571d0" class="">can be used to test our code (but not deployed to production)</p><p id="12ea76aa-0932-4293-8bac-934b1ceddf2d" class="">
</p><h2 id="7270b0c4-8b6b-4e8c-8ba9-ac3f8058825b" class="">fprintf 🖨️</h2><p id="875af0c8-12fe-4b0c-babf-ccdb8a0d9695" class="">use <mark class="highlight-brown"><code>fprintf</code></mark> to print to a file or <mark class="highlight-brown"><code>stderr</code></mark> (instead of the default <mark class="highlight-brown"><code>stdout</code></mark>)</p><pre id="41a9e479-1a20-4803-854a-1dcf742d8e04" class="code"><code>fprintf(stderr, &quot;insufficient memory&quot;);</code></pre><p id="493bd265-e8e3-43ff-a6fc-2c83a2801b88" class="">
</p><hr id="1349a95f-924b-45c8-9908-5f0707c1dda6"/><p id="37bfd2d5-9c55-463a-b5a9-6c56475f1ab7" class="">
</p></div></article></body></html>`,
    public: true,
    // TODO: nextId
    course: "COMP2521",
  },
  {
    id: "comp1511_01",
    name: "1. printf, command line, scanf, conditionals, constants",
    description: "Introduction to using the terminal and programming in C.",
    html: `<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>Week 1 - printf, command line, scanf, conditionals, constants</title><style>
/* cspell:disable-file */
/* webkit printing magic: print all background colors */
html {
	-webkit-print-color-adjust: exact;
}
* {
	box-sizing: border-box;
	-webkit-print-color-adjust: exact;
}

html,
body {
	margin: 0;
	padding: 0;
}
@media only screen {
	body {
		margin: 2em auto;
		max-width: 900px;
		color: rgb(55, 53, 47);
	}
}

body {
	line-height: 1.5;
	white-space: pre-wrap;
}

a,
a.visited {
	color: inherit;
	text-decoration: underline;
}

.pdf-relative-link-path {
	font-size: 80%;
	color: #444;
}

h1,
h2,
h3 {
	letter-spacing: -0.01em;
	line-height: 1.2;
	font-weight: 600;
	margin-bottom: 0;
}

.page-title {
	font-size: 2.5rem;
	font-weight: 700;
	margin-top: 0;
	margin-bottom: 0.75em;
}

h1 {
	font-size: 1.875rem;
	margin-top: 1.875rem;
}

h2 {
	font-size: 1.5rem;
	margin-top: 1.5rem;
}

h3 {
	font-size: 1.25rem;
	margin-top: 1.25rem;
}

.source {
	border: 1px solid #ddd;
	border-radius: 3px;
	padding: 1.5em;
	word-break: break-all;
}

.callout {
	border-radius: 3px;
	padding: 1rem;
}

figure {
	margin: 1.25em 0;
	page-break-inside: avoid;
}

figcaption {
	opacity: 0.5;
	font-size: 85%;
	margin-top: 0.5em;
}

mark {
	background-color: transparent;
}

.indented {
	padding-left: 1.5em;
}

hr {
	background: transparent;
	display: block;
	width: 100%;
	height: 1px;
	visibility: visible;
	border: none;
	border-bottom: 1px solid rgba(55, 53, 47, 0.09);
}

img {
	max-width: 100%;
}

@media only print {
	img {
		max-height: 100vh;
		object-fit: contain;
	}
}

@page {
	margin: 1in;
}

.collection-content {
	font-size: 0.875rem;
}

.column-list {
	display: flex;
	justify-content: space-between;
}

.column {
	padding: 0 1em;
}

.column:first-child {
	padding-left: 0;
}

.column:last-child {
	padding-right: 0;
}

.table_of_contents-item {
	display: block;
	font-size: 0.875rem;
	line-height: 1.3;
	padding: 0.125rem;
}

.table_of_contents-indent-1 {
	margin-left: 1.5rem;
}

.table_of_contents-indent-2 {
	margin-left: 3rem;
}

.table_of_contents-indent-3 {
	margin-left: 4.5rem;
}

.table_of_contents-link {
	text-decoration: none;
	opacity: 0.7;
	border-bottom: 1px solid rgba(55, 53, 47, 0.18);
}

table,
th,
td {
	border: 1px solid rgba(55, 53, 47, 0.09);
	border-collapse: collapse;
}

table {
	border-left: none;
	border-right: none;
}

th,
td {
	font-weight: normal;
	padding: 0.25em 0.5em;
	line-height: 1.5;
	min-height: 1.5em;
	text-align: left;
}

th {
	color: rgba(55, 53, 47, 0.6);
}

ol,
ul {
	margin: 0;
	margin-block-start: 0.6em;
	margin-block-end: 0.6em;
}

li > ol:first-child,
li > ul:first-child {
	margin-block-start: 0.6em;
}

ul > li {
	list-style: disc;
}

ul.to-do-list {
	padding-inline-start: 0;
}

ul.to-do-list > li {
	list-style: none;
}

.to-do-children-checked {
	text-decoration: line-through;
	opacity: 0.375;
}

ul.toggle > li {
	list-style: none;
}

ul {
	padding-inline-start: 1.7em;
}

ul > li {
	padding-left: 0.1em;
}

ol {
	padding-inline-start: 1.6em;
}

ol > li {
	padding-left: 0.2em;
}

.mono ol {
	padding-inline-start: 2em;
}

.mono ol > li {
	text-indent: -0.4em;
}

.toggle {
	padding-inline-start: 0em;
	list-style-type: none;
}

/* Indent toggle children */
.toggle > li > details {
	padding-left: 1.7em;
}

.toggle > li > details > summary {
	margin-left: -1.1em;
}

.selected-value {
	display: inline-block;
	padding: 0 0.5em;
	background: rgba(206, 205, 202, 0.5);
	border-radius: 3px;
	margin-right: 0.5em;
	margin-top: 0.3em;
	margin-bottom: 0.3em;
	white-space: nowrap;
}

.collection-title {
	display: inline-block;
	margin-right: 1em;
}

.page-description {
    margin-bottom: 2em;
}

.simple-table {
	margin-top: 1em;
	font-size: 0.875rem;
	empty-cells: show;
}
.simple-table td {
	height: 29px;
	min-width: 120px;
}

.simple-table th {
	height: 29px;
	min-width: 120px;
}

.simple-table-header-color {
	background: rgb(247, 246, 243);
	color: black;
}
.simple-table-header {
	font-weight: 500;
}

time {
	opacity: 0.5;
}

.icon {
	display: inline-block;
	max-width: 1.2em;
	max-height: 1.2em;
	text-decoration: none;
	vertical-align: text-bottom;
	margin-right: 0.5em;
}

img.icon {
	border-radius: 3px;
}

.user-icon {
	width: 1.5em;
	height: 1.5em;
	border-radius: 100%;
	margin-right: 0.5rem;
}

.user-icon-inner {
	font-size: 0.8em;
}

.text-icon {
	border: 1px solid #000;
	text-align: center;
}

.page-cover-image {
	display: block;
	object-fit: cover;
	width: 100%;
	max-height: 30vh;
}

.page-header-icon {
	font-size: 3rem;
	margin-bottom: 1rem;
}

.page-header-icon-with-cover {
	margin-top: -0.72em;
	margin-left: 0.07em;
}

.page-header-icon img {
	border-radius: 3px;
}

.link-to-page {
	margin: 1em 0;
	padding: 0;
	border: none;
	font-weight: 500;
}

p > .user {
	opacity: 0.5;
}

td > .user,
td > time {
	white-space: nowrap;
}

input[type="checkbox"] {
	transform: scale(1.5);
	margin-right: 0.6em;
	vertical-align: middle;
}

p {
	margin-top: 0.5em;
	margin-bottom: 0.5em;
}

.image {
	border: none;
	margin: 1.5em 0;
	padding: 0;
	border-radius: 0;
	text-align: center;
}

.code,
code {
	background: rgba(135, 131, 120, 0.15);
	border-radius: 3px;
	padding: 0.2em 0.4em;
	border-radius: 3px;
	font-size: 85%;
	tab-size: 2;
}

code {
	color: #eb5757;
}

.code {
	padding: 1.5em 1em;
}

.code-wrap {
	white-space: pre-wrap;
	word-break: break-all;
}

.code > code {
	background: none;
	padding: 0;
	font-size: 100%;
	color: inherit;
}

blockquote {
	font-size: 1.25em;
	margin: 1em 0;
	padding-left: 1em;
	border-left: 3px solid rgb(55, 53, 47);
}

.bookmark {
	text-decoration: none;
	max-height: 8em;
	padding: 0;
	display: flex;
	width: 100%;
	align-items: stretch;
}

.bookmark-title {
	font-size: 0.85em;
	overflow: hidden;
	text-overflow: ellipsis;
	height: 1.75em;
	white-space: nowrap;
}

.bookmark-text {
	display: flex;
	flex-direction: column;
}

.bookmark-info {
	flex: 4 1 180px;
	padding: 12px 14px 14px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.bookmark-image {
	width: 33%;
	flex: 1 1 180px;
	display: block;
	position: relative;
	object-fit: cover;
	border-radius: 1px;
}

.bookmark-description {
	color: rgba(55, 53, 47, 0.6);
	font-size: 0.75em;
	overflow: hidden;
	max-height: 4.5em;
	word-break: break-word;
}

.bookmark-href {
	font-size: 0.75em;
	margin-top: 0.25em;
}

.sans { font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"; }
.code { font-family: "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace; }
.serif { font-family: Lyon-Text, Georgia, ui-serif, serif; }
.mono { font-family: iawriter-mono, Nitti, Menlo, Courier, monospace; }
.pdf .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK JP'; }
.pdf:lang(zh-CN) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK SC'; }
.pdf:lang(zh-TW) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK TC'; }
.pdf:lang(ko-KR) .sans { font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol", 'Twemoji', 'Noto Color Emoji', 'Noto Sans CJK KR'; }
.pdf .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK JP'; }
.pdf:lang(zh-CN) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK SC'; }
.pdf:lang(zh-TW) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK TC'; }
.pdf:lang(ko-KR) .code { font-family: Source Code Pro, "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK KR'; }
.pdf .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK JP'; }
.pdf:lang(zh-CN) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK SC'; }
.pdf:lang(zh-TW) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK TC'; }
.pdf:lang(ko-KR) .serif { font-family: PT Serif, Lyon-Text, Georgia, ui-serif, serif, 'Twemoji', 'Noto Color Emoji', 'Noto Serif CJK KR'; }
.pdf .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK JP'; }
.pdf:lang(zh-CN) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK SC'; }
.pdf:lang(zh-TW) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK TC'; }
.pdf:lang(ko-KR) .mono { font-family: PT Mono, iawriter-mono, Nitti, Menlo, Courier, monospace, 'Twemoji', 'Noto Color Emoji', 'Noto Sans Mono CJK KR'; }
.highlight-default {
	color: rgba(55, 53, 47, 1);
}
.highlight-gray {
	color: rgba(120, 119, 116, 1);
	fill: rgba(120, 119, 116, 1);
}
.highlight-brown {
	color: rgba(159, 107, 83, 1);
	fill: rgba(159, 107, 83, 1);
}
.highlight-orange {
	color: rgba(217, 115, 13, 1);
	fill: rgba(217, 115, 13, 1);
}
.highlight-yellow {
	color: rgba(203, 145, 47, 1);
	fill: rgba(203, 145, 47, 1);
}
.highlight-teal {
	color: rgba(68, 131, 97, 1);
	fill: rgba(68, 131, 97, 1);
}
.highlight-blue {
	color: rgba(51, 126, 169, 1);
	fill: rgba(51, 126, 169, 1);
}
.highlight-purple {
	color: rgba(144, 101, 176, 1);
	fill: rgba(144, 101, 176, 1);
}
.highlight-pink {
	color: rgba(193, 76, 138, 1);
	fill: rgba(193, 76, 138, 1);
}
.highlight-red {
	color: rgba(212, 76, 71, 1);
	fill: rgba(212, 76, 71, 1);
}
.highlight-gray_background {
	background: rgba(241, 241, 239, 1);
}
.highlight-brown_background {
	background: rgba(244, 238, 238, 1);
}
.highlight-orange_background {
	background: rgba(251, 236, 221, 1);
}
.highlight-yellow_background {
	background: rgba(251, 243, 219, 1);
}
.highlight-teal_background {
	background: rgba(237, 243, 236, 1);
}
.highlight-blue_background {
	background: rgba(231, 243, 248, 1);
}
.highlight-purple_background {
	background: rgba(244, 240, 247, 0.8);
}
.highlight-pink_background {
	background: rgba(249, 238, 243, 0.8);
}
.highlight-red_background {
	background: rgba(253, 235, 236, 1);
}
.block-color-default {
	color: inherit;
	fill: inherit;
}
.block-color-gray {
	color: rgba(120, 119, 116, 1);
	fill: rgba(120, 119, 116, 1);
}
.block-color-brown {
	color: rgba(159, 107, 83, 1);
	fill: rgba(159, 107, 83, 1);
}
.block-color-orange {
	color: rgba(217, 115, 13, 1);
	fill: rgba(217, 115, 13, 1);
}
.block-color-yellow {
	color: rgba(203, 145, 47, 1);
	fill: rgba(203, 145, 47, 1);
}
.block-color-teal {
	color: rgba(68, 131, 97, 1);
	fill: rgba(68, 131, 97, 1);
}
.block-color-blue {
	color: rgba(51, 126, 169, 1);
	fill: rgba(51, 126, 169, 1);
}
.block-color-purple {
	color: rgba(144, 101, 176, 1);
	fill: rgba(144, 101, 176, 1);
}
.block-color-pink {
	color: rgba(193, 76, 138, 1);
	fill: rgba(193, 76, 138, 1);
}
.block-color-red {
	color: rgba(212, 76, 71, 1);
	fill: rgba(212, 76, 71, 1);
}
.block-color-gray_background {
	background: rgba(241, 241, 239, 1);
}
.block-color-brown_background {
	background: rgba(244, 238, 238, 1);
}
.block-color-orange_background {
	background: rgba(251, 236, 221, 1);
}
.block-color-yellow_background {
	background: rgba(251, 243, 219, 1);
}
.block-color-teal_background {
	background: rgba(237, 243, 236, 1);
}
.block-color-blue_background {
	background: rgba(231, 243, 248, 1);
}
.block-color-purple_background {
	background: rgba(244, 240, 247, 0.8);
}
.block-color-pink_background {
	background: rgba(249, 238, 243, 0.8);
}
.block-color-red_background {
	background: rgba(253, 235, 236, 1);
}
.select-value-color-interactiveBlue { background-color: rgba(35, 131, 226, .07); }
.select-value-color-pink { background-color: rgba(245, 224, 233, 1); }
.select-value-color-purple { background-color: rgba(232, 222, 238, 1); }
.select-value-color-green { background-color: rgba(219, 237, 219, 1); }
.select-value-color-gray { background-color: rgba(227, 226, 224, 1); }
.select-value-color-translucentGray { background-color: rgba(255, 255, 255, 0.0375); }
.select-value-color-orange { background-color: rgba(250, 222, 201, 1); }
.select-value-color-brown { background-color: rgba(238, 224, 218, 1); }
.select-value-color-red { background-color: rgba(255, 226, 221, 1); }
.select-value-color-yellow { background-color: rgba(253, 236, 200, 1); }
.select-value-color-blue { background-color: rgba(211, 229, 239, 1); }

.checkbox {
	display: inline-flex;
	vertical-align: text-bottom;
	width: 16;
	height: 16;
	background-size: 16px;
	margin-left: 2px;
	margin-right: 5px;
}

.checkbox-on {
	background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%2358A9D7%22%2F%3E%0A%3Cpath%20d%3D%22M6.71429%2012.2852L14%204.9995L12.7143%203.71436L6.71429%209.71378L3.28571%206.2831L2%207.57092L6.71429%2012.2852Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E");
}

.checkbox-off {
	background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20fill%3D%22white%22%20stroke%3D%22%2336352F%22%20stroke-width%3D%221.5%22%2F%3E%0A%3C%2Fsvg%3E");
}
	
</style></head><body><article id="8352e0fd-9c76-4c5c-ae5b-959cc99a31da" class="page sans"><header><div class="page-header-icon undefined"><span class="icon">❓</span></div><h1 class="page-title">Week 1 - printf, command line, scanf, conditionals, constants</h1><p class="page-description"></p></header><div class="page-body"><figure id="e886d498-d5bc-46ac-8262-c782281b8075"><div class="source"><a href="Week%201%20-%20printf,%20command%20line,%20scanf,%20conditionals%208352e0fd9c764c5cae5b959cc99a31da/COMP1511_Lecture_1_Slides.pdf">https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2ebaef5c-1347-49ee-8f08-d0d137bb960e/COMP1511_Lecture_1_Slides.pdf</a></div></figure><p id="6de407c6-bd4d-4a87-8096-3a42143438dd" class=""><strong>What is a computer?</strong></p><p id="bc813c9d-6f71-4063-98df-81f7b6fed2b7" class="">a device with a processor to execute commands and memory to store information</p><p id="b40be551-c8c9-4852-b0d5-21f84f76e374" class="">
</p><p id="cf5b3f90-1139-4bdb-8359-cd2d111bbfdb" class=""><strong>What is programming?</strong></p><p id="23c0d5a2-3df9-464f-87c2-0817a26c1d4d" class="">When you provide a computer with specific instructions to solve various problems<div class="indented"><p id="86e64aa4-ba97-4c8e-b21e-1a96ba7c8789" class="">instructions are written in a programming language (code)</p><p id="436ab40e-9a65-4942-a957-bd6a1206a718" class="">
</p></div></p><p id="d823aa28-9b91-4829-ba5e-ecb51964108e" class=""><strong>What is an operating system?</strong></p><p id="808cad4e-c616-4dd0-bcff-10285cc941e3" class="">An operation system is the interface between user and computer hardware<div class="indented"><p id="7cddc200-d75d-49ee-a4ae-6e6e85f7926e" class="">OS will:<div class="indented"><ul id="b96b48ac-3c14-401b-9c04-90a1a9663893" class="bulleted-list"><li style="list-style-type:disc">execute user programs </li></ul><ul id="02d362b7-8376-4b01-8b1e-a71b77ea334b" class="bulleted-list"><li style="list-style-type:disc">makes computer system more convenient to use</li></ul></div></p></div></p><p id="e7039163-ec06-457d-a07e-e984c9790a0d" class="">
</p><p id="104954ff-7f4c-4fa3-9590-461df61eefa3" class="">in COMP1151, we use <strong>Linux </strong>(a Unix-based OS)<div class="indented"><p id="03ddef20-d253-4351-b7b1-578776e0e2ce" class="">features: open source, more reliable, lightweight, faster, more secure</p><p id="a3174d2c-250e-4d9f-9e2d-16f92d9bcbe9" class="">
</p><p id="49e8e272-edd5-4ab3-8a3f-cfcd46d2248b" class="">
</p></div></p><p id="8f8c3f23-b7db-4512-a9e3-b37d4fb03b9f" class="">Command Line Commands<div class="indented"><p id="cd689405-a9e2-438a-a372-7cff1f570698" class=""><code>mkdir</code> = make directory</p><p id="1138a7db-ca18-4415-bfc5-8035d6af1753" class=""><code>ls</code> = list elements in directory</p><p id="68b1f61f-df22-494d-b5ed-365b7a04106e" class=""><code>rmdir</code> = delete a directory</p><p id="0ad7160c-4bd6-4125-a460-29ebfea2b725" class=""><code>pwd</code> = prints out the present working directory</p><p id="5e62d863-64d7-4dae-9cd5-3ba356cf8064" class=""><code>cd</code> = change directory</p><p id="e29b8a4f-be9e-435d-a4bf-4a6fbe3babb7" class=""><code>cp</code> = copy file </p><p id="ccb842a7-bebb-411e-871b-1a6181aaa9fe" class=""><code>mv</code> = move file</p></div></p><p id="61d0fd17-cc22-47ff-911c-816764e3c0a7" class="">
</p><p id="0289cb72-2329-4ae7-8d6a-956f38f10c1a" class=""><code>.</code> = current directory</p><p id="c90c9603-4edf-4f59-88b1-d6387768a273" class=""><code>..</code> = parent directory</p><p id="f48b336f-7d8c-4baf-a960-b674ab269496" class="">
</p><hr id="8d368afc-ed14-44e6-b6da-556591bf0d5e"/><p id="dfc43148-e4d6-4136-9d8c-8cd73fc531fa" class="">
</p><h2 id="331d0550-660c-4c5d-ae4a-eb12f41e83c9" class="">Variables</h2><p id="ccbda423-b1ec-4d50-b70f-76ede3204e42" class="">a variable allows us to store data in the computer’s memory</p><p id="665801da-f5bb-47a8-a09c-aff61f86995c" class="">
</p><p id="bedb8a0b-8c84-4407-bd5a-8bc7c4f6e7f8" class="">variables have data types:</p><ul id="86899c08-7484-4d0d-b017-52159f9eecef" class="bulleted-list"><li style="list-style-type:disc">char</li></ul><ul id="0c780825-ffcd-415a-98cf-d775e30e902f" class="bulleted-list"><li style="list-style-type:disc">double </li></ul><ul id="5f344c2a-dc82-4e9c-9a37-1304a8c9d7b0" class="bulleted-list"><li style="list-style-type:disc">int</li></ul><p id="797879f0-753f-41d0-805d-9afe5a882101" class="">
</p><pre id="f94957ff-16b4-4f82-a145-1325a072f7df" class="code"><code>// declare and initialize a variable
char character1 = &#x27;a&#x27;; // initialise chars with single quotes
int my_age = 17;
double pi = 3.14;</code></pre><p id="93958527-02e8-4568-b55d-661875daf357" class="">
</p><pre id="67f6a482-342f-4a43-b20b-7d0b75fc21fe" class="code"><code>// print out variable values
printf(&quot;My character is: %c&quot;, character1);
printf(&quot;My age is: %d&quot;, my_age);
printf(&quot;Pi is: %lf&quot;, pi); // lf = long float

printf(&quot;My initial is %c and my age is %d&quot;, character1, my_age);</code></pre><p id="0c7aeb4a-ecdb-4f8f-85e7-2a3da3c10a48" class="">
</p><pre id="270d45bc-c5b2-4567-80f7-16d01dff63b2" class="code"><code>// print out float to 2 decimal places
printf(&quot;Pi is: %.2lf&quot;, pi);</code></pre><p id="a9d33bb6-6711-4421-9a97-ea1072c079c2" class="">
</p><pre id="f6dea565-915e-4e2b-b314-0a59a5cf8834" class="code"><code>// take input from the user
// scans integer input from a user and 
// stores it in variable users_int
int users_int;
printf(&quot;Please enter a number : &quot;);
scanf(&quot;%d&quot;, &amp;users_int);</code></pre><p id="cf96ffa8-0c6d-42a2-85e8-98860fc57e74" class="">
</p><pre id="50efa5e0-ed04-465a-a9a3-887f2884382e" class="code"><code>// returns the memory address of a variable
&amp;variable_name</code></pre><p id="bf7c9467-6674-4e07-8335-b7d7a7aa584e" class="">
</p><pre id="f78b18ad-100d-462a-bfdd-3f34319122f2" class="code"><code>// constant = variable that does change
// define constants before main function

#define NUMBER_OF_MONTHS 12 // you don&#x27;t need to define the 
#define PI 3.1415 //data-type of the constant</code></pre><p id="a5c41a60-33d6-4a5a-8cce-d3d554a42b55" class="">
</p><pre id="cddea628-06a4-43c1-b5a3-61d8d2771f7b" class="code"><code>// if you divide two integers, you are returned an integer
int answer = 11 / 5; // answer = 2
float answer = 11 / 5; // answer = 2.0000000
float answer = 11.0 / 5; // answer = 2.20000</code></pre><p id="e690344c-71b4-4b15-98a5-d5b3e534ac3a" class="">
</p><pre id="f4306ee6-9e8c-4138-b9b5-80c5d9104bb6" class="code"><code>// % is modulus (returns remainder upon division)
int remainder = 11 / 5; // remainder = 1</code></pre><p id="39bb8a0f-699c-4743-af54-b72825e9ae20" class="">
</p><pre id="eaaefcdf-6228-4d08-af71-0781cb47724e" class="code"><code>// if statement
if (condition) {
	// do something
} else if (other condition) {
	// do something else
} else {
	// do something else
}

/* operators include:
&lt;   less than
&gt;   greater than
==  equals
&lt;=  less than or equal to
&gt;=  greater than or equal to
!=  not equal to

*/</code></pre></div></article></body></html>`,
    public: true,
    // TODO: nextId
    course: "COMP1511",
  },
];

const getCourses = publicProcedure.query(() => {
  return [...new Set(NOTES.map((n) => n.course))];
});

const getIds = publicProcedure.query(() => {
  return NOTES.map((n) => n.id);
});

const getBriefDetails = publicProcedure.query(() => {
  return NOTES.map((n) => {
    return {
      id: n.id,
      name: n.name,
      description: n.description,
      course: n.course,
    };
  });
});

const getNote = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ input }) => {
    const note = NOTES.find((n) => n.id === input.id);

    if (!note) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Id is invalid" });
    }

    return note;
  });

const getNotes = publicProcedure.query(() => {
  return NOTES;
});

export const notesRouter = createTRPCRouter({
  getIds,
  getNote,
  getNotes,
  getCourses,
  getBriefDetails,
});
