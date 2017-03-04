var dateArray = [];
for(i=1; i<=336; i++) {
  var rawDate = document.getElementsByName("specdate")[0].children[i].value;
  dateDate = rawDate.replace(/ /g,"+");
  dateDate = dateDate.replace(/:/g,"%3A");
  dateArray.push(dateDate);
}
console.log(dateArray);
