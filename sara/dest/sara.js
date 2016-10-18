var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var fs=require("fs");

var templateDir="./text_strings/client";
var getPath=function getPath(file){return templateDir+"/"+file;};
var TextStrings_sv_path=getPath("TextStrings_sv.json");
var TextStrings_sv=fs.readFileSync(TextStrings_sv_path,{encoding:"utf8"});
TextStrings_sv=JSON.parse(TextStrings_sv);

var syncTextStrings=function syncTextStrings(file){


if(file==="TextStrings_default.json")
return;

if(file==="TextStrings_sv.json")
return;

var path=getPath(file);

var TextStrings=fs.readFileSync(path,{encoding:"utf8"});
TextStrings=JSON.parse(TextStrings);


Object.keys(_extends({},TextStrings)).
filter(function(key){return TextStrings_sv[key]===undefined;}).
forEach(function(key){return delete TextStrings[key];});


TextStrings=_extends({},TextStrings_sv,TextStrings);




TextStrings=JSON.stringify(TextStrings,undefined,2);
fs.unlinkSync(path);
fs.writeFileSync(path,TextStrings,{encoding:"utf8"});
console.log("Updated: "+path);
};


fs.readdirSync(templateDir).filter(function(file){return file!=="jkdfk";}).
forEach(function(languageCode){return syncTextStrings(languageCode);});


TextStrings_sv=JSON.stringify(TextStrings_sv,undefined,2);
fs.unlinkSync(TextStrings_sv_path);
fs.writeFileSync(TextStrings_sv_path,TextStrings_sv,{encoding:"utf8"});