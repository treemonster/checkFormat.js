/*
Simple format compare tool
code by treemonster
git: https://github.com/treemonster/compare.js
*/
(function(){
  var is=function(a,b){
    return a!==undefined && a.constructor===b;
  };
  var tester={};
  tester.checkNumber=function(needCheck,key,checkRegExp){
    var num=needCheck[key]*1;
    var number_test=/^(?:(?:([(\[])(-{0,1}\d*(?:\.\d|\d\.|\d)\d*)){0,1}),(?:(?:(-{0,1}\d*(?:\.\d|\d\.|\d)\d*)([)\]])){0,1})(\+{0,1})$/;
    return number_test.test(checkRegExp) && checkRegExp.replace(number_test,function(all,a,b,c,d,e){
      b*=1;c*=1;
      if(e)needCheck[key]=num;
      var meet= !isNaN(num);
      if(a!==undefined)
        if(a==='[')meet&=b<=num;
        else meet&=b<num;
      if(d!==undefined)
        if(d===']')meet&=c>=num;
        else meet&=c>num;
      if(meet)return 'TRUE';
    })==='TRUE';
  };
  tester.checkSpecial=function(needCheck,key,checkRegExp){
    var nk=needCheck[key];
    switch(checkRegExp){
      case 'nan':return isNaN(nk*1);
      case 'nan+':return isNaN(needCheck[key]*=1);
      case 'NaN':return isNaN(nk);
      case 'undefined':return nk===undefined;
      case 'null':return nk===null;
      case '[]':return is(nk,Array) && !nk.length;
      case '{}':return is(nk,Object) && !Object.keys(nk).length;
    }
  };
  var compare=function(needCheck,format){
    if(!is(format,Object) && !is(format,Array))return compare(
      {check:needCheck},
      {check:format}
    );
    var check,checkData;
    for(var check in format){
      checkData=format[check];
      switch(checkData){
      case String:case Array:case Object:
      case Function:case RegExp:case Number:
      case Date:case Blob:
        if(!is(needCheck[check],checkData))return false;
        continue;
      }
      switch(checkData.constructor){
      case RegExp:
        if(!checkData.test(needCheck[check]+''))return false;
        break;
      case String:
        var matched=false;
        for(var checker in tester)
          if(matched|=tester[checker](needCheck,check,checkData))break;
        if(!matched)return false;
        break;
      case Array:case Object:
        if(!is(needCheck[check],checkData.constructor))return false;
        if(!compare(needCheck[check],checkData))return false;
        break;
      case Function:
        if(!checkData(needCheck[check]))return false;
      default: return false;
      }
    }
    return true;
  };
  for(var types=[
  'String','Array','Object',
  'Function','RegExp','Number',
  'Date','Blob'
  ],i=0;i<types.length;i++){
    if(!this[types[i]])this[types[i]]={};
  }
  if(typeof(module)!=="undefined")module.exports=compare;
  else if(typeof(this)!=="undefined")this.compare=compare;
  else throw new error('Unknown environment');
})();
