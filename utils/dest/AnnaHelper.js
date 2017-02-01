var symbolsThatShouldNotBeReplaced=['%1$s','%2$s','%3$s','%4$s','%1$d','%2$d','%3$d','%4$d'];
var hashPrefix=8943894903403;

var toHash=function toHash(text){
symbolsThatShouldNotBeReplaced.forEach(function(symbol,index){
var splits=text.split(symbol);
text=splits.join(''+hashPrefix+index);
});

return text;
};

var fromHash=function fromHash(text){
symbolsThatShouldNotBeReplaced.forEach(function(symbol,index){
var splits=text.split(''+hashPrefix+index);
text=splits.join(symbol);
});

return text;
};

module.exports={toHash:toHash,fromHash:fromHash};