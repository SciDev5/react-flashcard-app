
export function weightedRandom<T>(arr:({weight:number,value:T})[]):T|null {
    const arrWithValidWeights = arr.filter(({weight})=>isFinite(weight) && weight > 0);
    if (arrWithValidWeights.length === 0)
        return null;
    
    const weightSum = arrWithValidWeights.map(v=>v.weight).reduce((a,b)=>a+b);
    const rng = Math.random()*weightSum;
    let current = 0;
    for (const {weight,value} of arrWithValidWeights) {
        current += weight;
        if (current >= rng)
            return value;
    }
    return null;
}
