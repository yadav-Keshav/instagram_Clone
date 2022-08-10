function getRelevantFoodOutlet(city, maxCost) {
    var i = 1;
    const ans = [];
    while (i <= 100) {
        const url = `https://jsonmock.hackerrank.com/api/food_outlet?city=${city}&page=${i}`;
        console.log(url);
        fetch(url)
        .then((data) => {
            data.forEach((x) => {
                if (x.maxCost <= maxCost) {
                    ans.push(x.name);
                }
            })
        })
        .catch(err=>{
            return;
        })
        i++;
    }
    return ans;
}

const result=getRelevantFoodOutlet("keshav" ,2000);