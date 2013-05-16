/*
 * This program is copyright � 2008-2011 Eric Bishop and is distributed under the terms of the GNU GPL 
 * version 2.0 with a special clarification/exception that permits adapting the program to 
 * configure proprietary "back end" software provided that all modifications to the web interface
 * itself remain covered by the GPL. 
 * See http://gargoyle-router.com/faq.html#qfoss for more information
 */function addLoadFunction(e){var t=window.onload;window.onload=typeof window.onload!="function"?e:function(){t(),e()}}function setControlsEnabled(e,t,n){var r=document.getElementById("darken"),i=document.getElementById("wait_msg");if(!e){var s="100%",o="100%";document.body.parentNode.scrollHeight?s=document.body.parentNode.scrollHeight+"px":document.height&&(s=document.height+"px"),document.body.parentNode.scrollWidth?(o=document.body.parentNode.scrollWidth,document.width&&(o=document.width>o?document.width:o),o+="px"):document.width&&(o=document.width+"px");var u,a;self.innerHeight?(u=window.innerHeight,viewportWidth=window.innerWidth):document.documentElement&&document.documentElement.clientHeight?(u=document.documentElement.clientHeight,viewportWidth=document.documentElement.clientWidth):document.body&&(u=document.body.clientHeight,viewportWidth=document.body.clientWidth);var f=Math.floor((viewportWidth-300)/2),l=Math.floor((u-150)/2),c=!1;document.all&&(c=!0);if(c){var h=document.getElementById("d_iframe");h.style.display="block",h.style.width=o,h.style.height=s;var p=document.getElementById("m_iframe");p.style.display="block",p.style.width="300px",p.style.height="150px",i.style.position="absolute",l+=document.documentElement.scrollTop,f+=document.documentElement.scrollLeft}r.style.height=s,r.style.width=o,i.style.left=f>=0?f+"px":"0px",i.style.top=l>=0?l+"px":"0px",r.style.display="block",t&&(i.style.display="block",n!=null&&(document.getElementById("wait_txt").firstChild.data=n))}else r.style.display="none",i.style.display="none";setBrowserTimeCookie()}function setBrowserTimeCookie(){var e=Math.floor((new Date).getTime()/1e3);document.cookie="browser_time="+e+"; path=/"}function getRequestObj(){var e;try{e=new XMLHttpRequest}catch(t){try{e=new ActiveXObject("Msxml2.XMLHTTP")}catch(t){try{e=new ActiveXObject("Microsoft.XMLHTTP")}catch(t){return!1}}}return e}function runAjax(e,t,n,r){setBrowserTimeCookie();var i=getRequestObj();return i&&(i.onreadystatechange=function(){r(i)},e=="POST"?(n=n==null?" ":n,i.open("POST",t,!0),i.setRequestHeader("Content-type","application/x-www-form-urlencoded"),i.send(n)):e=="GET"&&(i.open("GET",t+"?"+n,!0),i.send(null))),i}function UCIContainer(){this.keys=new Array,this.values=new Array,this.listOptions=new Array,this.createListOption=function(e,t,n,r){r=r==null?!0:!1;var i=e+"."+t+"."+n;if(this.listOptions[i]!=null)return;this.listOptions[i]=1;if(this.values[i]!=null){var s=this.values[i];this.values[i]=!r&&s!=null?[s]:[]}else this.keys.push(i),this.values[i]=[]},this.set=function(e,t,n,r,i){i=i==null?!1:i;var s=e+"."+t;n!=null&&n!=""&&(s=s+"."+n);if(this.values[s]!=null)if(this.listOptions[s]!=null){var o=this.values[s];while(o.length>0&&!i)o.pop();if(r instanceof Array){var u;for(u=0;u<r.length;u++)o.push(r[u])}else o.push(r);this.values[s]=o}else this.values[s]=r;else{this.keys.push(s);if(this.listOptions[s]!=null){var o=[];if(r instanceof Array){var a;for(a=0;a<r.length;a++)o.push(r[a])}else o=[r];this.values[s]=o}else this.values[s]=r}},this.get=function(e,t,n){var r=e+"."+t;n!=null&&n!=""&&(r=r+"."+n);var i=this.values[r];return i!=null?i:""},this.removeAllSectionsOfType=function(e,t){var n=this.getAllSectionsOfType(e,t),r=0;for(r=0;r<n.length;r++)this.removeSection(e,n[r])},this.getAllOptionsInSection=function(e,t,n){n=n==null?!1:n;var r=new Array;for(keyIndex in this.keys){var i=this.keys[keyIndex],s=e+"."+t;if(i.match(s)&&i.match(/^[^\.]+\.[^\.]+\.[^\.]+/)&&(n||this.listOptions[i]==null)){var o=i.match(/^[^\.]+\.[^\.]+\.([^\.]+)$/)[1];r.push(o)}}return r},this.getAllSectionsOfType=function(e,t){var n=new Array;for(keyIndex in this.keys){key=this.keys[keyIndex];if(key.match(e)&&key.match(/^[^\.]+\.[^\.]+$/)&&this.values[key]==t){var r=key.match(/^[^\.]+\.([^\.]+)$/)[1];n.push(r)}}return n},this.getAllSections=function(e){var t=new Array;for(keyIndex in this.keys){key=this.keys[keyIndex];if(key.match(e)&&key.match(/^[^\.]+\.[^\.]+$/)){var n=key.match(/^[^\.]+\.([^\.]+)$/)[1];t.push(n)}}return t},this.remove=function(e,t,n){var r=e+"."+t;n!=""&&(r=r+"."+n),this.listOptions[r]!=null&&(this.listOptions[r]=null);var i=this.values[r];if(i!=null){this.values[r]=null;var s=[];while(this.keys.length>0){var o=this.keys.shift();o!=r&&s.push(o)}this.keys=s}else i="";return i},this.removeSection=function(e,t){removeKeys=new Array,sectionDefined=!1;for(keyIndex in this.keys){key=this.keys[keyIndex],testExp=new RegExp(e+"\\."+t+"\\.");if(key.match(testExp)){var n=key.split(".");removeKeys.push(n[2])}key==e+"."+t&&(sectionDefined=!0)}for(rkIndex in removeKeys)this.remove(e,t,removeKeys[rkIndex]);sectionDefined&&this.remove(e,t,"")},this.clone=function(){var e=new UCIContainer,t=0;for(t=0;t<this.keys.length;t++){var n=this.keys[t],r=this.values[n];this.listOptions[n]!=null&&(e.listOptions[n]=1);var i=n.match(/^([^\.]+)\.([^\.]+)\.([^\.]+)$/);i==null&&(i=n.match(/^([^\.]+)\.([^\.]+)$/),i!=null&&i.push("")),e.set(i[1],i[2],i[3],r,!0)}return e},this.print=function(){var e="",t=0;for(t=0;t<this.keys.length;t++){var n=this.keys[t];this.values[n]instanceof Array?e=e+"\n"+n+' = "'+this.values[n].join(",")+'"':e=e+"\n"+n+' = "'+this.values[n]+'"'}return e},this.getScriptCommands=function(e){var t=new Array,n=[],r=0;for(r=0;r<e.keys.length;r++){var i=e.keys[r],s=e.values[i],o=this.values[i];if(s instanceof Array&&!(o instanceof Array)||o instanceof Array&&!(s instanceof Array))t.push("uci del "+i);else if(s instanceof Array&&o instanceof Array){var u=s.length==o.length;if(u){var a=s.sort(),f=o.sort(),l;for(l=0;u&&l<a.length;l++)u=a[l]==f[l]?!0:!1}u?n[i]=1:t.push("uci del "+i)}else(o==null||o=="")&&s!=null&&s!=""&&t.push("uci del "+i)}for(r=0;r<this.keys.length;r++){var i=this.keys[r],s=e.values[i],o=this.values[i];try{if(s instanceof Array||o instanceof Array)if(o instanceof Array){if(n[i]==null){var c;for(c=0;c<o.length;c++){var h=""+o[c]+"";t.push("uci add_list "+i+"='"+h.replace(/'/,"'\\''")+"'")}}}else o=""+o+"",t.push("uci set "+i+"='"+o.replace(/'/,"'\\''")+"'");else s!=o&&o!=null&&o!=""&&(o=""+o+"",t.push("uci set "+i+"='"+o.replace(/'/,"'\\''")+"'"))}catch(p){alert("bad key = "+i+"\n")}}return t.push("uci commit"),t.join("\n")}}function getParameterDefinition(e,t){return fullEscape(e)+"="+fullEscape(t)}function fullEscape(e){e=escape(e);var t=["*","@","-","_","+",".","/"],n=["2A","40","2D","5F","2B","2E","2F"];for(oeIndex=0;oeIndex<t.length;oeIndex++){var r=e.split(t[oeIndex]);r.length>1&&(e=r.join("%"+n[oeIndex]))}return e}function removeStringFromArray(e,t){var n,r=[];for(n=0;n<e.length;n++){var i=!1;typeof e[n]=="string"&&(i=e[n]==t),i||r.push(e[n])}return r}function setChildText(e,t,n,r,i,s){s=s==null?document:s,parentElement=s.getElementById(e);if(parentElement!=null){n!=null&&(parentElement.style.color=n),r!=null&&(parentElement.style.fontWeight=r?"bold":"normal"),i!=null&&(parentElement.style.fontSize=i);while(parentElement.firstChild!=null)parentElement.removeChild(parentElement.firstChild);t=t==null?"":t;var o=t.split("\n");while(o.length>0){var u=o.shift();parentElement.appendChild(s.createTextNode(u)),o.length>0&&parentElement.appendChild(s.createElement("br"))}}}function createInput(e,t){t=t==null?document:t;try{inp=t.createElement("input"),inp.type=e}catch(n){inp=t.createElement('<input type="'+e+'" />')}return inp}function trueAndVisible(e,t){return document.getElementById(e).checked&&document.getElementById(t).style.display!="none"}function getDhcpSection(e){var t=e.getAllSections("dhcp"),n=t.length>0?t[0]:"cfg1";for(dsecIndex=0;dsecIndex<t.length;dsecIndex++)e.get("dhcp",t[dsecIndex],"interface")=="lan"&&(n=t[dsecIndex]);return n}function getWirelessMode(e){var t=e.getAllSectionsOfType("wireless","wifi-device"),n=[],r;for(r=0;r<t.length;r++){var i=e.get("wireless",t[r],"disabled");if(i=="0"||i=="")n[t[r]]=1}var s="",o="",u=e.getAllSectionsOfType("wireless","wifi-iface"),a;for(a=0;a<u.length;a++){var f=e.get("wireless",u[a],"device");if(n[f]==1){var l=e.get("wireless",u[a],"mode");s=l=="ap"?l:s,o=l=="ap"?e.get("wireless",u[a],"wds")?"wds":o:l}}var c=s!=""&&o!=""?"+":"",h=s+c+o,h=h==""?"disabled":h;return h}function setDescriptionVisibility(e,t,n,r){t=t==null?"inline":t,n=n==null?"More Info":n,r=r==null?"Hide Text":r;var i=document.getElementById(e+"_ref"),s=document.getElementById(e+"_txt"),o="uci set gargoyle.help."+e+"=";i.firstChild.data==n?(s.style.display=t,i.firstChild.data=r,o+="1\n"):(s.style.display="none",i.firstChild.data=n,o+="0\n"),o+="\nuci commit\n";var u=getParameterDefinition("commands",o)+"&"+getParameterDefinition("hash",document.cookie.replace(/^.*hash=/,"").replace(/[\t ;]+.*$/,""));runAjax("POST","utility/run_commands.sh",u,function(){return 0})}function initializeDescriptionVisibility(e,t,n,r,i){n=n==null?"inline":n,r=r==null?"More Info":r,i=i==null?"Hide Text":i;var s=r,o="none";e.get("gargoyle","help",t)=="1"&&(s=i,o=n),document.getElementById(t+"_ref").firstChild.data=s,document.getElementById(t+"_txt").style.display=o}function getSubnetRange(e,t){var n=e.split(".");if(n.length!=4)return[];var r=["255","254","252","248","240","224","192","128","0"],i=[0,1,2,3,4,5,6,7,8],s=0;while(n.length>0){var o=n.shift(),u=-1;for(testIndex=0;testIndex<9&&u<0;testIndex++)u=r[testIndex]==o?i[testIndex]:u;if(u<0)return[];s+=u}var a=Math.pow(2,s),f=parseInt(t.split(".")[3]),l=0;while(l+a<f)l+=a;return[l,l+a-1]}function rangeInSubnet(e,t,n,r){var i=getSubnetRange(e,t),s=i[0],o=i[1];return s!=null&&o!=null&&s<=n&&o>=r?!0:!1}function proofreadFields(e,t,n,r,i,s){s=s==null?document:s;var o=new Array;for(idIndex in e)isVisible=!0,i!=null&&i[idIndex]!=null&&(visibilityElement=s.getElementById(i[idIndex]),isVisible=visibilityElement.style.display=="none"||visibilityElement.disabled==1?!1:!0),isVisible&&(input=s.getElementById(e[idIndex]),f=n[idIndex],proofreadText(input,f,r[idIndex]),f(input.value)!=r[idIndex]&&(labelStr=t[idIndex]+"",s.getElementById(t[idIndex])!=null?(labelStr=s.getElementById(t[idIndex]).firstChild.data,labelStr=labelStr.replace(/:/,"")):alert("error in proofread: label with id "+t[idIndex]+" is not defined"),o.push("There is an error in "+labelStr)));return o}function parseBytes(e,t){var n;return t=t!="KBytes"&&t!="MBytes"&&t!="GBytes"&&t!="TBytes"?"mixed":t,t=="mixed"&&e>1099511627776||t=="TBytes"?n=truncateDecimal(e/1099511627776)+" TBytes":t=="mixed"&&e>1073741824||t=="GBytes"?n=truncateDecimal(e/1073741824)+" GBytes":t=="mixed"&&e>1048576||t=="MBytes"?n=truncateDecimal(e/1048576)+" MBytes":n=truncateDecimal(e/1024)+" KBytes",n}function parseKbytesPerSecond(e,t){var n;return t=t!="bytes/s"&&t!="KBytes/s"&&t!="MBytes/s"?"mixed":t,t=="mixed"&&e>1024||t=="MBytes/s"?n=truncateDecimal(e/1024)+" MBytes/s":n=e+" KBytes/s",n}function truncateDecimal(e){return result=""+Math.floor(e*1e3)/1e3,decMatch=result.match(/.*\.(.*)$/),decMatch==null?result+=".000":decMatch[1].length==1?result+="00":decMatch[1].length==2&&(result+="0"),result}function enableAssociatedField(e,t,n,r){r=r==null?document:r,element=r.getElementById(t),setElementEnabled(element,e.checked,n)}function setElementEnabled(e,t,n){if(t){e.readonly=!1,e.disabled=!1;if(e.type=="text"||e.type=="textarea")e.style.color="#000000",e.className="";else if(e.type=="select-one"||e.type=="select-multiple"||e.type=="select")e.className="";else if(e.type=="button"){var r=e.className.replace(/_button.*$/,"_button");e.className=r}}else{e.disabled=!0;if(e.type=="text"||e.type=="textarea")e.value=n,e.style.color="#AAAAAA",e.className="text_disabled";else if(e.type=="select-one"||e.type=="select-multiple"||e.type=="select")setSelectedValue(e.id,n,e.ownerDocument),e.className="select_disabled";else if(e.type=="button"){var r=e.className.replace(/_button.*$/,"_button");e.className=r+"_disabled"}else e.type=="file"&&(e.value=n)}}function getSelectedValue(e,t){t=t==null?document:t;if(t.getElementById(e)==null){alert("ERROR:"+e+" does not exist");return}return selectedIndex=t.getElementById(e).selectedIndex,selectedValue="",selectedIndex>=0&&(selectedValue=t.getElementById(e).options[t.getElementById(e).selectedIndex].value),selectedValue}function getSelectedText(e,t){return t=t==null?document:t,selectedIndex=t.getElementById(e).selectedIndex,selectedText="",selectedIndex>=0&&(selectedText=t.getElementById(e).options[t.getElementById(e).selectedIndex].text),selectedText}function setSelectedValue(e,t,n){var n=n==null?document:n,r=n.getElementById(e);r==null&&alert("ERROR: "+e+" does not exist");var i=!1;for(optionIndex=0;optionIndex<r.options.length&&!i;optionIndex++)i=r.options[optionIndex].value==t,i&&(r.selectedIndex=optionIndex);!i&&r.options.length>0&&r.selectedIndex<0&&(r.selectedIndex=0)}function setSelectedText(e,t,n){n=n==null?document:n,selectElement=n.getElementById(e),selectionFound=!1;for(optionIndex=0;optionIndex<selectElement.options.length&&!selectionFound;optionIndex++)selectionFound=selectElement.options[optionIndex].text==t,selectionFound&&(selectElement.selectedIndex=optionIndex);!selectionFound&&selectElement.options.length>0&&selectElement.selectedIndex<0&&(selectElement.selectedIndex=0)}function addOptionToSelectElement(e,t,n,r,i){i=i==null?document:i,option=i.createElement("option"),option.text=t,option.value=n;try{i.getElementById(e).add(option,r)}catch(s){r==null?i.getElementById(e).add(option):i.getElementById(e).add(option,r.index)}}function removeOptionFromSelectElement(e,t,n){n=n==null?document:n,selectElement=n.getElementById(e),selectionFound=!1;for(optionIndex=0;optionIndex<selectElement.options.length&&!selectionFound;optionIndex++)selectionFound=selectElement.options[optionIndex].text==t,selectionFound&&selectElement.remove(optionIndex)}function removeAllOptionsFromSelectElement(e){while(e.length>0)try{e.remove(0)}catch(t){}}function setAllowableSelections(e,t,n,r){r==null&&(r=document);var i=r.getElementById(e);if(n!=null&&t!=null&&i!=null){var s=!0;if(t.length==i.options.length){s=!1;for(optionIndex=0;optionIndex<i.options.length&&!s;optionIndex++)s=s||i.options[optionIndex].text!=n[optionIndex]||i.options[optionIndex].value!=t[optionIndex]}if(s){currentSelection=getSelectedValue(e,r),removeAllOptionsFromSelectElement(i);for(addIndex=0;addIndex<t.length;addIndex++)addOptionToSelectElement(e,n[addIndex],t[addIndex],null,r);setSelectedValue(e,currentSelection,r)}}}function setSingleChild(e,t){while(e.firstChild!=null)e.removeChild(e.firstChild);e.appendChild(t)}function setVariableFromValue(e){elementId=e[0],visibilityId=e[1],uci=e[2],pkg=e[3],section=e[4],option=e[5],setIfBlank=e[6];var t=!0;visibilityId!=null&&(t=document.getElementById(visibilityId).style.display=="none"?!1:!0),t==1&&(value=document.getElementById(elementId).value,(value!=""||setIfBlank==1)&&uci.set(pkg,section,option,value))}function setVariableFromModifiedValue(e){elementId=e[0],visibilityId=e[1],uci=e[2],pkg=e[3],section=e[4],option=e[5],setIfBlank=e[6],modFunction=e[7],isVisible=!0,visibilityId!=null&&(isVisible=document.getElementById(visibilityId).style.display=="none"?!1:!0),isVisible==1&&(value=document.getElementById(elementId).value,(value!=""||setIfBlank==1)&&uci.set(pkg,section,option,modFunction(value)))}function setVariableFromCombined(e){elementIds=e[0],visibilityId=e[1],uci=e[2],pkg=e[3],section=e[4],option=e[5],setIfBlank=e[6],combineFunction=e[7],isVisible=!0,visibilityId!=null&&(isVisible=document.getElementById(visibilityId).style.display=="none"?!1:!0);if(isVisible==1){values=new Array;for(idIndex in elementIds)values.push(document.getElementById(elementIds[idIndex]).value);(value!=""||setIfBlank==1)&&uci.set(pkg,section,option,combineFunction(values))}}function setVariableFromConcatenation(e){elementIds=e[0],visibilityIds=e[1],uci=e[2],pkg=e[3],section=e[4],option=e[5],setIfBlank=e[6],concat="",nextIdIndex=0;while(nextIdIndex<elementIds.length)idVisible=!0,visibilityIds!=null&&(nextVisId=visibilityIds[nextIdIndex],nextVisId!=null&&(idVisible=document.getElementById(nextVisId).style.display=="none"?!1:!0)),value=document.getElementById(elementIds[nextIdIndex]).value,idVisible==1&&value!=""&&(value=document.getElementById(elementIds[nextIdIndex]).value,endSpace=nextIdIndex<elementIds.length-1?" ":"",concat=concat+value+endSpace),nextIdIndex++;(concat!=""||setIfBlank==1)&&uci.set(pkg,section,option,concat)}function setVariableConditionally(e){elementId=e[0],visibilityId=e[1],uci=e[2],pkg=e[3],section=e[4],option=e[5],testFunction=e[6],useValueFromElement=e[7],alternateValue=e[8],isVisible=!0,visibilityId!=null&&(isVisible=document.getElementById(visibilityId).style.display=="none"?!1:!0),isVisible==1&&(value=useValueFromElement==1?document.getElementById(elementId).value:alternateValue,testFunction(value)&&uci.set(pkg,section,option,value))}function setVariables(e,t,n,r,i,s,o,u){for(idIndex in e){nextId=e[idIndex],nextVisibilityId=t[idIndex],nextPkg=r[idIndex],nextSection=i[idIndex],nextOption=s[idIndex],nextParams=u[idIndex],nextFunction=o[idIndex];if(isArray(nextParams)){fullList=[nextId,nextVisibilityId,n,nextPkg,nextSection,nextOption];for(pIndex in nextParams)fullList.push(nextParams[pIndex]);nextFunction(fullList)}else nextFunction([nextId,nextVisibilityId,n,nextPkg,nextSection,nextOption,nextParams])}}function loadSelectedValueFromVariable(e){var t=e[0],n=e[1],r=e[2],i=e[3],s=e[4],o=e[5],u=n.get(r,i,s);u!=null&&u!=""?setSelectedValue(t,u):o!=null&&setSelectedValue(t,o)}function loadValueFromVariable(e){var t=e[0],n=e[1],r=e[2],i=e[3],s=e[4],o=e[5],u=n.get(r,i,s),a=document.getElementById(t);u!=null&&u!=""?a.value=u:o!=null&&(a.value=o)}function loadValueFromVariableMultiple(e){var t=e[6];loadValueFromVariable(e);var n=document.getElementById(e[0]);n.value=n.value*t}function loadValueFromModifiedVariable(e){var t=e[0],n=e[1],r=e[2],i=e[3],s=e[4],o=e[5],u=e[6],a=u(n.get(r,i,s)),f=document.getElementById(t);a!=null&&a!=""?f.value=a:o!=null&&(f.value=o)}function loadValueFromVariableAtIndex(e){var t=e[0],n=e[1],r=e[2],i=e[3],s=e[4],o=e[5],u=e[6],a=n.get(r,i,s),f=a.split(/[,\t ]+/),l;u<f.length?l=f[u]:l="";var c=document.getElementById(t);l!=null&&l!=""?c.value=l:o!=null&&(c.value=o)}function loadChecked(e){var t=e[0],n=e[1],r=e[2],i=e[3],s=e[4],o=e[5];document.getElementById(e[0]).checked=o(n.get(r,i,s))}function isArray(e){return e.constructor.toString().indexOf("Array")>=0||e instanceof Array?!0:!1}function loadVariables(e,t,n,r,i,s,o){for(idIndex in t){nextId=t[idIndex],nextPkg=n[idIndex],nextSection=r[idIndex],nextOption=i[idIndex],nextParams=s[idIndex],nextFunc=o[idIndex];if(isArray(nextParams)){fullList=[nextId,e,nextPkg,nextSection,nextOption];for(pIndex in nextParams)fullList.push(nextParams[pIndex]);nextFunc(fullList)}else nextFunc([nextId,e,nextPkg,nextSection,nextOption,nextParams])}}function loadValueFromMultipleVariables(e){var t=e[0],n=e[1],r=e[2],i=e[3],s=e[4],o=e[5],u=e[6],a=new Array;for(pkgIndex in r)a.push(n.get(r[pkgIndex],i[pkgIndex],s[pkgIndex]));var f=o(a),l=document.getElementById(t);f!=null&&f!=""?l.value=f:u!=null&&(l.value=u)}function setVisibility(e,t,n,r){r==null&&(r=document);for(index in e)element=r.getElementById(e[index]),t[index]==0?element.style.display="none":n?element.style.display=n[index]:element.style.display="block"}function validateIP(e){var t=0;if(e=="0.0.0.0")t=1;else if(e=="255.255.255.255")t=2;else{var n=e.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);if(n==null)t=5;else for(field=1;field<=4;field++)n[field]>255&&(t=4),n[field]==255&&field==4&&(t=3)}return t}function validateMac(e){var t=0,n=e.split(/:/);if(n.length!=6)t=2;else for(fieldIndex=0;fieldIndex<6&&t==0;fieldIndex++)field=n[fieldIndex],field.match(/^[0123456789ABCDEFabcdef]{2}$/)==null&&(t=1);return t}function validateMultipleIps(e){e=e.replace(/^[\t ]+/g,""),e=e.replace(/[\t ]+$/g,"");var t=e.split(/[\t ]*,[\t ]*/),n=t.length>0?0:1;while(n==0&&t.length>0){var r=t.pop();if(r.match(/-/)){var i=r.split(/[\t ]*-[\t ]*/);if(i.length==2&&validateIP(i[0])==0&&validateIP(i[1])==0){var s=getIpInteger(i[0]),o=getIpInteger(i[1]);n=s<=o?0:1}else n=1}else n=validateIpRange(r)}return n}function validateMultipleIpsOrMacs(e){var t=e.replace(/^[\t ]+/g,"");t=t.replace(/[\t ]+$/g,"");var n=t.split(/[\t ]*,[\t ]*/),r=n.length>0?0:1;while(r==0&&n.length>0){var i=n.pop();if(i.match(/-/)){var s=i.split(/[\t ]*-[\t ]*/);if(s.length==2&&validateIP(s[0])==0&&validateIP(s[1])==0){var o=getIpInt(s[0]),u=getIpInt(s[1]);r=o<=u?0:1}else r=1}else i.match(/:/)?r=validateMac(i):r=validateIpRange(i)}return r}function validateDecimal(e){var t=e.match(/^[\d]*\.?[\d]+$/)!=null||e.match(/^[\d]+\.?[\d]*$/)!=null?0:1;return t}function validateNumeric(e){var t=e.match(/^[\d]+$/)==null?1:0;return t}function validatePort(e){return validateNumericRange(e,1,65535)}function validateNumericRange(e,t,n){var r=e.match(/^[\d]+$/)==null?1:0;return r==0&&(r=e<t?2:0),r==0&&(r=e>n?3:0),r}function validatePortOrPortRange(e){var t=0;if(e.match(/-/)!=null){var n=e.split(/-/);n.length>2?t=5:(error1=validateNumericRange(n[0],1,65535),error2=validateNumericRange(n[1],1,65535),t=error1+10*error2,t==0&&(t=n[1]-n[0]>=0?0:4))}else t=validateNumericRange(e,1,65535);return t}function validateNetMask(e){var t=0,n=e.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);if(n==null)t=4;else{previousField=255;for(field=1;field<=4;field++)n[field]>255&&(t=3),previousField<255&&n[field]!=0&&t<2&&(t=2),n[field]!=255&&n[field]!=254&&n[field]!=252&&n[field]!=248&&n[field]!=240&&n[field]!=224&&n[field]!=192&&n[field]!=128&&n[field]!=0&&t<1&&(t=1),previousField=n[field]}return t}function validateIpRange(e){var t=1;if(e.indexOf("/")>0){var n=e.split("/");if(n.length==2){var r=validateIP(n[0]),i=validateNetMask(n[1])==0||validateNumericRange(n[1],1,31)==0?0:1;t=r==0&&i==0?0:1}}else t=validateIP(e);return t}function validateLengthRange(e,t,n){var r=0;return e.length<t&&(r=1),e.length>n&&(r=2),r}function validateHex(e){var t=0;return e.match(/^[0123456789AaBbCcDdEeFf]*$/)||(t=1),t}function validateHours(e){var t=e.match(/,/)?e.split(/,/):[e],n=!0;for(commaIndex=0;commaIndex<t.length&&n;commaIndex++){var r=t[commaIndex].split(/-/),i=r.length==2;i&&(i=i&&r[0].match(/^[\t ]*([0-1]?[0-9]|2[0-3])(:[0-5][0-9])?[\t ]*$/),i=i&&r[1].match(/^[\t ]*([0-1]?[0-9]|2[0-3])(:[0-5][0-9])?[\t ]*$/)),n=n&&i}return n?0:1}function validateWeeklyRange(e){var t=e.match(/,/)?e.split(/,/):[e],n=!0;for(commaIndex=0;commaIndex<t.length&&n;commaIndex++){var r=t[commaIndex].split(/-/),i=r.length==2;i&&(r[0]=r[0].toLowerCase(),r[1]=r[1].toLowerCase(),i=i&&r[0].match(/^[\t ]*(sun|mon|tue|wed|thu|fri|sat)[\t ]*([0-1]?[0-9]|2[0-3])(:[0-5]?[0-9])?(:[0-5]?[0-9])?[\t ]*$/),i=i&&r[1].match(/^[\t ]*(sun|mon|tue|wed|thu|fri|sat)[\t ]*([0-1]?[0-9]|2[0-3])(:[0-5]?[0-9])?(:[0-5]?[0-9])?[\t ]*$/)),n=n&&i}return n?0:1}function proofreadHours(e){proofreadText(e,validateHours,0)}function proofreadWeeklyRange(e){proofreadText(e,validateWeeklyRange,0)}function proofreadLengthRange(e,t,n){var r=function(e){return validateLengthRange(e,t,n)};proofreadText(e,r,0)}function proofreadIp(e){proofreadText(e,validateIP,0)}function proofreadMask(e){proofreadText(e,validateNetMask,0)}function proofreadIpRange(e){proofreadText(e,validateIpRange,0)}function proofreadMac(e){proofreadText(e,validateMac,0)}function proofreadMultipleIps(e){proofreadText(e,validateMultipleIps,0)}function proofreadMultipleIpsOrMacs(e){proofreadText(e,validateMultipleIpsOrMacs,0)}function proofreadDecimal(e){proofreadText(e,validateDecimal,0)}function proofreadNumeric(e){proofreadText(e,validateNumeric,0)}function proofreadNumericRange(e,t,n){proofreadText(e,function(e){return validateNumericRange(e,t,n)},0)}function proofreadPort(e){proofreadText(e,validatePort,0)}function proofreadPortOrPortRange(e){proofreadText(e,validatePortOrPortRange,0)}function proofreadText(e,t,n){e.disabled!=1&&(e.style.color=t(e.value)==n?"black":"red")}function getEmbeddedSvgWindow(e,t){t==null&&(t=document);var n=t.getElementById(e),r=null;try{var i=n.getSVGDocument();r=i.defaultView}catch(s){}if(r==null){try{r=n.window}catch(o){}if(r==null)try{r=n.getWindow()}catch(u){}}return r}function getBridgeSection(e){var t=uciOriginal.getAllSections("wireless"),n=uciOriginal.get("network","wan",""),r="",i;for(i=0;i<t.length&&r=="";i++){var s=function(n){return e.get("wireless",t[i],n).toLowerCase()};s("mode")=="wds"&&n==""?r=t[i]:s("mode")=="sta"&&s("wds")=="1"&&n==""?r=t[i]:s("mode")=="sta"&&s("client_bridge")=="1"&&(r=t[i])}return r}function isBridge(e){var t=getBridgeSection(e)==""?!1:!0;return t}function parseTimezones(e){timezoneList=[],timezoneRegions=[],timezoneDefinitions=[],definitionTimezones=[];for(lineIndex=0;lineIndex<e.length;lineIndex++)line=e[lineIndex],!line.match(/^[\t ]*#/)&&line.length>0&&(splitLine=line.split(/[\t]+/),region=stripQuotes(splitLine.pop()),definition=stripQuotes(splitLine.pop()),timezone=stripQuotes(splitLine.pop()),timezoneList.push(timezone),timezoneDefinitions[timezone]=definition,definitionTimezones[definition]=timezone,timezoneRegions[timezone]=region);return[timezoneList,timezoneRegions,timezoneDefinitions,definitionTimezones]}function stripQuotes(e){return e.match(/\".*\"/)&&(e=e.match(/^[^\"]*\"([^\"]*)\"/)[1]),e}function textListToSpanElement(e,t,n){t=t==null?!1:t,n=n==null?document:n;var r=n.createElement("span"),i;for(i=0;i<e.length;i++)i>0&&r.appendChild(n.createElement("br")),r.appendChild(n.createTextNode(e[i]+(i<e.length-1&&t?",":"")));return r}function addAddressStringToTable(e,t,n,r,i,s,o,u){i=i==null?!0:!1,s=s==null?3:s;var a;s==0?a=function(){return 1}:s==1?a=validateIP:s==2?a=validateIpRange:a=validateMultipleIps;var f=[],l=[],c=e.getElementById(n);if(c.firstChild!=null){var h=c.firstChild,p=getTableDataArray(h,!0,!1),d;for(d=0;d<p.length;d++){var v=p[d][0];validateMac(v)==0?f.push(v):l.push(v)}}e=e==null?document:e,o=o==null?!0:o;var m=t.split(/[\t ]*,[\t ]*/),g=m.length>0?0:1,y;for(y=0;y<m.length&&g==0;y++){var v=m[y],b=i&&validateMac(v)==0,w=a(v)==0;if(b||w){var E=b?f:l;g=E.length==0||!testAddrOverlap(v,E.join(","))?0:1,g==0&&E.push(v)}else g=1}if(g==0){var h=c.childNodes.length>0?c.firstChild:createTable([""],[],r,!0,!1,null,null,e);t=t.replace(/^[\t ]*/,""),t=t.replace(/[\t ]*$/,"");var S=t.split(/[\t ]*,[\t ]*/);while(S.length>0)addTableRow(h,[S.shift()],!0,!1,null,null,e);c.childNodes.length==0&&c.appendChild(h),u!=null&&(h.style.width=""+u+"px")}else o&&alert("ERROR: Invalid Address\n");return g==0?!0:!1}function addAddressesToTable(e,t,n,r,i,s,o,u){var a=e.getElementById(t).value,f=addAddressStringToTable(e,a,n,r,i,s,o,u);return f&&(e.getElementById(t).value=""),f}function parsePaddedInt(e){e=e==null?"":e,e=e.replace(/[\t ]+/,"");while(e.length>1&&e.match(/^0/)||e.length>2&&e.match(/^\-0/))e=e.replace(/^0/,""),e=e.replace(/^\-0/,"-");return parseInt(e)}function getIpInteger(e){e=e==null?"":e;var t=e.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);return t?(+parsePaddedInt(t[1])<<24)+(+parsePaddedInt(t[2])<<16)+(+parsePaddedInt(t[3])<<8)+ +parsePaddedInt(t[4]):parseInt("")}function getMaskInteger(e){return-1<<32-parsePaddedInt(e)}function getIpRangeIntegers(e){var t=0,n=0;if(e.match(/\//)){var r=e.split(/[\t ]*\/[\t ]*/),i=getIpInteger(r[0]),s=r[1].match(/\./)?getIpInteger(r[1]):getMaskInteger(r[1]);t=i&s,n=t|~s}else if(e.match(/-/)){var r=e.split(/[\t ]*\-[\t ]*/);t=getIpInteger(r[0]),n=getIpInteger(r[1])}else t=getIpInteger(e),n=t;return[t,n]}function testSingleAddrOverlap(e,t){var n=function(e){e=e==""?"ALL":e.toUpperCase();if(e=="ALL_OTHERS_COMBINED"||e=="ALL_OTHERS_INDIVIDUAL")e="ALL_OTHERS_COMBINED";return e};e=n(e),t=n(t);var r=!1;if(e==t)r=!0;else if(validateMultipleIps(e)>0||validateMultipleIps(t)>0||e.match(",")||t.match(","))r=!1;else{var i=getIpRangeIntegers(e),s=getIpRangeIntegers(t);r=i[0]<=s[1]&&i[1]>=s[0]}return r}function testAddrOverlap(e,t){e=e.replace(/^[\t ]+/,""),e=e.replace(/[\t ]+$/,""),t=t.replace(/^[\t ]+/,""),t=t.replace(/[\t ]+$/,"");var n=e.split(/[,\t ]+/),r=t.split(/[,\t ]+/),i,s=!1;for(i=0;i<n.length&&!s;i++){var o;for(o=0;o<r.length&&!s;o++)s=s||testSingleAddrOverlap(n[i],r[o])}return s}function setInvisibleIfIdMatches(e,t,n,r,i){i=i==null?document:i,r=r==null?"block":r;var s=i.getElementById(n),o=!1,u=0;if(s!=null){for(u=0;u<t.length;u++)o=getSelectedValue(e,i)==t[u]?!0:o;o?s.style.display="none":s.style.display=r}}function arrToHash(e){var t=[],n;for(n=0;n<e.length;n++)t[e[n]]=1;return t}function confirmPassword(e,t,n){e=e==null?"Confirm Password:":e;if(typeof confirmWindow!="undefined")try{confirmWindow.close()}catch(r){}try{xCoor=window.screenX+225,yCoor=window.screenY+225}catch(r){xCoor=window.left+225,yCoor=window.top+225}var i="password_confirm.sh";confirmWindow=window.open(i,"password","width=560,height=260,left="+xCoor+",top="+yCoor);var s=createInput("button",confirmWindow.document),o=createInput("button",confirmWindow.document);s.value="OK",s.className="default_button",o.value="Cancel",o.className="default_button",runOnEditorLoaded=function(){updateDone=!1,confirmWindow.document!=null&&confirmWindow.document.getElementById("bottom_button_container")!=null&&(confirmWindow.document.getElementById("bottom_button_container").appendChild(s),confirmWindow.document.getElementById("bottom_button_container").appendChild(o),setChildText("confirm_text",e,null,null,null,confirmWindow.document),o.onclick=function(){confirmWindow.close()},s.onclick=function(){setControlsEnabled(!1,!0,"Verifying Password...");var e='gargoyle_session_validator -p "'+confirmWindow.document.getElementById("password").value+'" -a "dummy.browser" -i "127.0.0.1"',r=getParameterDefinition("commands",e)+"&"+getParameterDefinition("hash",document.cookie.replace(/^.*hash=/,"").replace(/[\t ;]+.*$/,"")),i=function(e){if(e.readyState==4){confirmWindow.close();var r=e.responseText.split("\n")[0];r.match(/^echo \"invalid\"/)?n.call(null):t.call(null)}};runAjax("POST","utility/run_commands.sh",r,i)},confirmWindow.moveTo(xCoor,yCoor),confirmWindow.focus(),updateDone=!0),updateDone||setTimeout("runOnEditorLoaded()",250)},runOnEditorLoaded()}function getUsedPorts(){var e=uciOriginal.getAllSections("dropbear"),t=uciOriginal.get("dropbear",e[0],"Port"),n=uciOriginal.get("httpd_gargoyle","server","http_port"),r=uciOriginal.get("httpd_gargoyle","server","https_port"),i=[];i.tcp=[],i.udp=[];var s=[];s.push([t,"tcp","SSH port"]),i.tcp[t]=1,n!=""&&(s.push([n,"tcp","web server port"]),i.tcp[n]=1),r!=""&&(s.push([r,"tcp","web server port"]),i.tcp[r]=1);var o=uciOriginal.getAllSectionsOfType("firewall","remote_accept"),u;for(u=0;u<o.length;u++){var a=o[u],f=uciOriginal.get("firewall",a,"local_port"),l=uciOriginal.get("firewall",a,"remote_port"),c=uciOriginal.get("firewall",a,"start_port"),h=uciOriginal.get("firewall",a,"end_port"),p=uciOriginal.get("firewall",a,"proto").toLowerCase(),d=uciOriginal.get("firewall",a,"zone").toLowerCase();if(d=="wan"||d==""){var v;l=l==""?f:l;for(v=0;v<s.length;v++)v[0]==f&&(v[1]==p||p==""||p=="tcpudp")&&localport!=l&&localport!=""&&(p==""||p=="tcpudp"?(s.push([l,"tcp",v[2]]),s.push([l,"udp",v[2]]),i.tcp[l]=1,i.udp[l]=1):(s.push([l,p,v[2]]),i[p][l]=1));if(f!=""){var m=p==""||p=="tcpudp"?["tcp","udp"]:[p];while(m.length>0){var g=m.shift();i[g][l]==null&&(s.push([l,g,"port redirected to router"]),i[g][l]=1,i[g][f]==null&&(s.push([f,g,"port in use by router"]),i[g][f]=1))}}if(f==""&&c!=""&&h!=""){var m=p==""||p=="tcpudp"?["tcp","udp"]:[p];while(m.length>0){var g=m.shift();s.push([c+"-"+h,g,"port redirected to router"])}}}}var y=uciOriginal.getAllSectionsOfType("firewall","redirect"),b;for(b=0;b<y.length;b++){var a=o[u],f=uciOriginal.get("firewall",a,"local_port"),l=uciOriginal.get("firewall",a,"remote_port"),p=uciOriginal.get("firewall",a,"proto").toLowerCase(),w=uciOriginal.get("firewall",a,"src").toLowerCase(),E=uciOriginal.get("firewall",a,"dest").toLowerCase(),S=uciOriginal.get("firewall",a,"src_dport"),x=uciOriginal.get("firewall",a,"dest_ip");s.push([l,p,"port forwarded to "+x])}return s}function checkForPortConflict(e,t,n){var r=null,i=null,s=!1;if(e.match(/-/)){var o=e.split(/-/);r=parseInt(o[0]),i=parseInt(o[1]),s=!0}else e=parseInt(e);if(n!=null){n.tcp=n["tcp"]==null?[]:n.tcp,n.udp=n["udp"]==null?[]:n.udp;if(n[t][e]!=null&&n[t][""+e]!=null)return"";var u;for(u in n[t])if(u.match(/-/)){var a=u.split(/-/);if(!s&&e>=parseInt(a[0])&&e<=parseInt(a[1]))return"";if(s&&r<=parseInt(a[1])&&i>=parseInt(a[0]))return""}}var f=getUsedPorts(),l,c="";for(l=0;l<f.length&&c=="";l++){var h=f[l];if(t==h[1]){var p=h[0];if(p.match(/\-/)){var o=
p.split(/\-/);!s&&e>=parseInt(o[0])&&e<=parseInt(o[1])&&(c=h[2]),s&&r<=parseInt(o[1])&&i>=parseInt(o[0])&&(c=h[2])}else!s&&e==parseInt(p)&&(c=h[2]),s&&parseInt(p)>=r&&parseInt(p)<=i&&(c=h[2])}}return c}function query(e,t,n,r){document.getElementById("wait_icon").style.display="none",document.getElementById("wait_txt").style.display="none",wmOldTxt=document.getElementById("wait_txt").style=="none"?!1:!0,wmOldBack=document.getElementById("wait_msg").style.background,wmOldWidth=document.getElementById("wait_msg").style.width,wmOldHeight=document.getElementById("wait_msg").style.height,wmOldTop=document.getElementById("wait_msg").style.top,document.getElementById("wait_msg").style.background="white",document.getElementById("wait_msg").style.width="585px",document.getElementById("wait_msg").style.height="500px",setControlsEnabled(!1,!1),document.getElementById("wait_msg").style.top="20px",queryFieldset=document.createElement("fieldset"),queryFieldset.innerHTML='<legend class="sectionheader" id="query_header">'+e+'</legend><div style="clear:both;display:block"><span class="nocolumn" id="query_text">'+t+'</span></div><div id="spacer_div" style="display:block; mrgin:8px;">&nbsp;</div><div id="query_button_container"></div>',document.getElementById("wait_msg").appendChild(queryFieldset);var i=[],s;for(s=0;s<n.length;s++)b=createInput("button",document),b.value=n[s],b.className="default_button",b.onclick=function(){document.getElementById("wait_msg").removeChild(queryFieldset),document.getElementById("wait_msg").style.background=wmOldBack,document.getElementById("wait_msg").style.width=wmOldWidth,document.getElementById("wait_msg").style.height=wmOldHeight,document.getElementById("wait_msg").style.top=wmOldTop,document.getElementById("wait_icon").style.display="block",document.getElementById("wait_txt").style.display="block",setControlsEnabled(!1,wmOldTxt),r(this.value)},document.getElementById("query_button_container").appendChild(b),document.getElementById("query_button_container").appendChild(document.createElement("br"))}window.onresize=function(){try{document.getElementById("darken").style.display=="block"&&setControlsEnabled(!1,document.getElementById("wait_msg").style.display=="block")}catch(t){}};