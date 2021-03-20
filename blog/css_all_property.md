---
title: 'CSS all Property
tags:
    - css
description: '實作過程的紀錄 & 備忘錄'
author: '謝尚庭 Neil'
published: false
slugs:
    - ___UNPUBLISHED___km9fa2c2_DT58csJ3vjFkjHpd91G1FzPecPyJSVU7
---

```html
<!DOCTYPE html>
<html>
<head>
<style> 
html {
  font-size: small;
  color: blue;
}

#ex1 {
  background-color: yellow;
  color: red;
}

#ex2 {
  background-color: yellow;
  color: red;
  all: inherit;
}

#ex3 {
  background-color: yellow;
  color: red;
  all: initial;
}

#ex4 {
  background-color: yellow;
  color: red;
}

#ex4.aaa {
  all: unset;
}
</style>
</head>
<body>

<p>No all property:</p>
<div id="ex1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>

<p>all: inherit:</p>
<div id="ex2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>

<p>all: initial:</p>
<div id="ex3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>

<p>all: unset:</p>
<div id="ex4" class="aaa">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>

</body>
</html>
```
