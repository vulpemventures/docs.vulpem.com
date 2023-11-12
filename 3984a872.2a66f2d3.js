(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{75:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return p})),n.d(t,"default",(function(){return l}));var r=n(3),i=n(7),o=(n(0),n(90)),a={id:"introduction",title:"Introduction"},c={unversionedId:"nigiri/introduction",id:"nigiri/introduction",isDocsHomePage:!1,title:"Introduction",description:"Nigiri provides a command line interface that manages a selection of docker-compose batteries included to have ready-to-use bitcoin regtest development environment, with a bitcoin node, electrum explorer both backend and frontend user interface.",source:"@site/docs/nigiri/introduction.md",slug:"/nigiri/introduction",permalink:"/nigiri/introduction",editUrl:"https://github.com/vulpemventures/docs.vulpem.com/edit/master/docs/docs/nigiri/introduction.md",version:"current",sidebar:"docs",previous:{title:"Ionio Account",permalink:"/marina/ionio-example"},next:{title:"Getting Started",permalink:"/nigiri/getting-started"}},p=[],u={toc:p};function l(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Nigiri provides a command line interface that manages a selection of ",Object(o.b)("inlineCode",{parentName:"p"},"docker-compose")," batteries included to have ready-to-use bitcoin ",Object(o.b)("inlineCode",{parentName:"p"},"regtest")," development environment, with a ",Object(o.b)("strong",{parentName:"p"},"bitcoin")," node, ",Object(o.b)("strong",{parentName:"p"},"electrum")," explorer both backend and frontend user interface. "),Object(o.b)("p",null,"It offers a ",Object(o.b)("a",{parentName:"p",href:"https://github.com/vulpemventures/nigiri-chopsticks"},"JSON HTTP proxy passtrough, called Nigiri Chopsticks")," that adds to the explorer handy endpoints like ",Object(o.b)("inlineCode",{parentName:"p"},"/faucet")," and ",Object(o.b)("inlineCode",{parentName:"p"},"/mint")," with automatic block generation."),Object(o.b)("p",null,"You can have Elements too with the ",Object(o.b)("inlineCode",{parentName:"p"},"--liquid")," flag."),Object(o.b)("p",null,"Are you looking to spin-up Nigiri in Travis or Github Action? Look ",Object(o.b)("a",{parentName:"p",href:"https://github.com/vulpemventures/nigiri-travis"},"here")))}l.isMDXComponent=!0},90:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return b}));var r=n(0),i=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=i.a.createContext({}),l=function(e){var t=i.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},s=function(e){var t=l(e.components);return i.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},m=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,a=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),s=l(n),m=r,b=s["".concat(a,".").concat(m)]||s[m]||d[m]||o;return n?i.a.createElement(b,c(c({ref:t},u),{},{components:n})):i.a.createElement(b,c({ref:t},u))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=m;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var u=2;u<o;u++)a[u]=n[u];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);