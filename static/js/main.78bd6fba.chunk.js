(this["webpackJsonpfake-baseball-scouting-page"]=this["webpackJsonpfake-baseball-scouting-page"]||[]).push([[0],{230:function(e,t,n){},231:function(e,t,n){},414:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n(0),c=n.n(r),i=n(31),s=n.n(i),l=(n(230),n(231),n(222)),u=n(12),o=n(70),j=n(33),b=n(32),d=n.n(b),h=n(51),O=n(16),f=n(223),m=c.a.createContext({currentLeague:"mlr",setCurrentLeague:function(){}}),x=function(e){var t=Object(r.useState)("mlr"),n=Object(O.a)(t,2),c=n[0],i=n[1];return Object(a.jsx)(m.Provider,Object(j.a)({value:{currentLeague:c,setCurrentLeague:i}},e))},p=function(){var e=c.a.useContext(m);if(null==e)throw new Error("LeagueToggleContext must be used inside provider");return e},g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"v1",t=p(),n=t.currentLeague;return Object(f.b)("https://".concat("milr"===n?n+".":"","redditball.com/api/").concat(e))},y=n(107),v=n(419),C=function(e){var t=e.plays,n=c.a.useMemo((function(){var e=t.reduce((function(e,t){return e[t.beforeState.inning]||(e[t.beforeState.inning]=[]),e[t.beforeState.inning].push({id:t.id,pitcher:t.pitcher.firstName+" "+t.pitcher.lastName,batter:t.batter.firstName+" "+t.batter.lastName,pitch:t.pitch,swing:t.swing,diff:t.diff,result:t.result,score:t.afterState.awayScore+"-"+t.afterState.homeScore}),e}),{}),n=[];return Object.entries(e).forEach((function(e,t){var a=Object(O.a)(e,2),r=a[0],c=a[1];n.push({id:t,inning:r,children:c})})),n}),[t]);return Object(a.jsx)("div",{children:Object(a.jsxs)(v.a,{isTree:!0,defaultExpandAllRows:!0,rowKey:"id",data:n,children:[Object(a.jsxs)(v.a.Column,{flexGrow:1,children:[Object(a.jsx)(v.a.HeaderCell,{children:"Inning"}),Object(a.jsx)(v.a.Cell,{dataKey:"inning"})]}),Object(a.jsxs)(v.a.Column,{flexGrow:1,children:[Object(a.jsx)(v.a.HeaderCell,{children:"Pitcher"}),Object(a.jsx)(v.a.Cell,{dataKey:"pitcher"})]}),Object(a.jsxs)(v.a.Column,{flexGrow:1,children:[Object(a.jsx)(v.a.HeaderCell,{children:"Batter"}),Object(a.jsx)(v.a.Cell,{dataKey:"batter"})]}),Object(a.jsxs)(v.a.Column,{flexGrow:1,children:[Object(a.jsx)(v.a.HeaderCell,{children:"Pitch"}),Object(a.jsx)(v.a.Cell,{dataKey:"pitch"})]}),Object(a.jsxs)(v.a.Column,{flexGrow:1,children:[Object(a.jsx)(v.a.HeaderCell,{children:"Swing"}),Object(a.jsx)(v.a.Cell,{dataKey:"swing"})]}),Object(a.jsxs)(v.a.Column,{flexGrow:1,children:[Object(a.jsx)(v.a.HeaderCell,{children:"Diff"}),Object(a.jsx)(v.a.Cell,{dataKey:"diff"})]}),Object(a.jsxs)(v.a.Column,{flexGrow:1,children:[Object(a.jsx)(v.a.HeaderCell,{children:"Result"}),Object(a.jsx)(v.a.Cell,{dataKey:"result"})]}),Object(a.jsxs)(v.a.Column,{flexGrow:1,children:[Object(a.jsx)(v.a.HeaderCell,{children:"Score"}),Object(a.jsx)(v.a.Cell,{dataKey:"score"})]})]})})},w=n(220),k=n.n(w),S=function(e){var t=e.plays,n=Object(r.useMemo)((function(){return{chart:{id:"line",zoom:{enabled:!1},redrawOnParentResize:!1},xaxis:{categories:Object(o.a)(Array(t.length).keys()).map((function(e){return++e}))},markers:{size:5,showNullDataPoints:!1},stroke:{width:[7,2,5],dashArray:[0,3,0]},yaxis:{min:0,max:1e3}}}),[t]),c=Object(r.useMemo)((function(){return[{name:"Pitch",type:"line",data:t.map((function(e){return e.pitch}))},{name:"Swing",type:"line",data:t.map((function(e){return e.swing}))},{name:"Delta",type:"column",data:t.map((function(e,t,n){if(t>0&&n[t-1]){var a=Math.abs(e.pitch-n[t-1].pitch);return a>500?1e3-a:a}return null}))}]}),[t]);return Object(a.jsx)(k.a,{options:n,series:c,type:"line",height:"100%"})},I=n(422),P=n(423),T=n(421),K=n(424),L=n(425),z=n(426),G=n(420),H=function(){var e=Object(r.useState)(0),t=Object(O.a)(e,2),n=t[0],c=t[1],i=Object(r.useState)(6),s=Object(O.a)(i,2),l=s[0],u=s[1],b=Object(r.useState)(1),f=Object(O.a)(b,2),m=f[0],x=f[1],v=Object(r.useState)(),w=Object(O.a)(v,2),k=w[0],H=w[1],M=function(){var e=Object(r.useState)(),t=Object(O.a)(e,2),n=t[0],a=t[1],c=g(),i=c.get,s=c.response;return[n,c.loading,c.error,Object(r.useCallback)(function(){var e=Object(h.a)(d.a.mark((function e(t){var n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i("games/".concat(t,"/log"));case 2:return n=e.sent,s.ok&&a(n),e.abrupt("return",n);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[i,a,s])]}(),E=Object(O.a)(M,4),A=E[0],N=E[1],R=E[3],B=function(){var e=Object(r.useState)(),t=Object(O.a)(e,2),n=t[0],a=t[1],c=g(),i=c.get,s=c.response;return[n,c.loading,c.error,Object(r.useCallback)(function(){var e=Object(h.a)(d.a.mark((function e(t,n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i("games/".concat(t,"/").concat(n));case 2:return r=e.sent,s.ok&&a(r),e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),[i,a,s])]}(),D=Object(O.a)(B,4),J=D[0],F=D[1],q=D[3],Q=p(),U=Q.currentLeague,V=Q.setCurrentLeague;return console.log(U),Object(r.useEffect)((function(){(function(){var e=Object(h.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q(l,m);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()(),H(void 0)}),[l,m,q]),Object(r.useEffect)((function(){k&&R(k.id)}),[k,R]),Object(a.jsxs)(I.a,{style:{height:"100%"},children:[Object(a.jsx)(P.a,{children:Object(a.jsxs)(T.a,{justify:"space-between",style:{padding:4},children:[Object(a.jsx)(T.a.Item,{children:Object(a.jsx)(K.a,{size:"md",checked:"milr"===U,onChange:function(e){console.log("checked",e),V(e?"milr":"mlr")},checkedChildren:"MiLR",unCheckedChildren:"MiLR"})}),Object(a.jsxs)(T.a,{justify:"end",style:{width:"50%"},children:[Object(a.jsx)(T.a.Item,{colspan:3,children:Object(a.jsx)(y.a,{value:{label:l,value:l},styles:{menuPortal:function(e){return Object(j.a)(Object(j.a)({},e),{},{zIndex:9999})}},menuPortalTarget:document.body,onChange:function(e){u(e.value)},options:Object(o.a)(Array(6).keys()).map((function(e){return++e})).map((function(e){return{label:e,value:e}}))})}),Object(a.jsx)(T.a.Item,{colspan:3,children:Object(a.jsx)(y.a,{value:{label:m,value:m},styles:{menuPortal:function(e){return Object(j.a)(Object(j.a)({},e),{},{zIndex:9999})}},menuPortalTarget:document.body,onChange:function(e){x(e.value)},options:Object(o.a)(Array(21).keys()).map((function(e){return++e})).map((function(e){return{label:e,value:e}}))})}),Object(a.jsx)(T.a.Item,{colspan:6,children:Object(a.jsx)(y.a,{isLoading:F,styles:{menuPortal:function(e){return Object(j.a)(Object(j.a)({},e),{},{zIndex:9999})}},menuPortalTarget:document.body,value:{label:k?"".concat(k.awayTeam.name," @ ").concat(k.homeTeam.name):"Pick game",value:k},onChange:function(e){H(e.value)},options:null===J||void 0===J?void 0:J.map((function(e){return{label:"".concat(e.awayTeam.name," @ ").concat(e.homeTeam.name),value:e}}))})})]})]})}),Object(a.jsx)(L.a,{style:{height:"100%"},children:Object(a.jsx)(T.a,{justify:"center",align:"middle",style:{height:"100%",width:"100%",flexDirection:"column"},children:N?Object(a.jsx)(z.a,{size:"lg"}):k&&A?Object(a.jsxs)(T.a.Item,{style:{width:"100%",height:"100%"},children:[Object(a.jsxs)(G.a,{appearance:"tabs",activeKey:n,onSelect:function(e){c(e)},children:[Object(a.jsx)(G.a.Item,{eventKey:0,children:k.awayTeam.name}),Object(a.jsx)(G.a.Item,{eventKey:1,children:k.homeTeam.name})]}),Object(a.jsxs)(T.a.Item,{style:{height:"auto"},children:[Object(a.jsx)(C,{plays:A.filter((function(e){return e.beforeState.inning[0]===(0===n?"B":"T")})).reverse()}),Object(a.jsx)(S,{plays:A.filter((function(e){return e.beforeState.inning[0]===(0===n?"B":"T")})).reverse()})]})]}):"Select a game"})})]})},M=function(){return Object(a.jsx)(a.Fragment,{children:" Coming soon: a player page."})},E=function(){return Object(a.jsx)(l.a,{basename:"/fake-baseball-scouting-page/",children:Object(a.jsxs)(u.d,{children:[Object(a.jsx)(u.a,{exact:!0,from:"/",to:"/game"}),Object(a.jsx)(u.b,{path:"/game",children:Object(a.jsx)(H,{})}),Object(a.jsx)(u.b,{path:"/player",children:Object(a.jsx)(M,{})})]})})},A=(n(413),function(){return Object(a.jsx)("div",{style:{height:"100vh",width:"100vw"},children:Object(a.jsx)(x,{children:Object(a.jsx)(E,{})})})});s.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(A,{})}),document.getElementById("root"))}},[[414,1,2]]]);
//# sourceMappingURL=main.78bd6fba.chunk.js.map