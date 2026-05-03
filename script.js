let currentTheme = localStorage.getItem("theme")||"vs-dark";
const toggleTheme =document.getElementById('themeToggle');

const updateTheme =(theme)=>{
    const mode =theme ==="vs-dark" ? "dark": "light";

    document.documentElement.setAttribute("data-theme",mode);

    toggleTheme.textContent = mode ==="dark" ? "🌞 Light Mode":"🌗 Dark Mode";

    localStorage.setItem("theme",theme);
}

updateTheme(currentTheme);


toggleTheme.addEventListener("click",()=>{
    currentTheme =currentTheme ==="vs-dark" ? "light":"vs-dark";
    updateTheme(currentTheme);
})

class JSPlayground{
    constructor(outputElement){
        this.outputElement=outputElement;
        this.history=[];
    }

    run(code){
        const logs=[];
        const startTime =performance.now();

        const customConsole ={
            log:(...args)=>logs.push(this.format(args)),
            error:(...args)=>logs.push("❌ "+this.format(args)),
            warn:(...args)=>logs.push("⚠️"+this.format(args))
        };

        try{
            const fn =new Function("console",`"use strict";${code}`);
            fn(customConsole);
        } catch(error){
            logs.push("❌ Error: " + error.message)
        }

        const endTime =performance.now();

        const executionTime = (endTime-startTime).toFixed(2);

        logs.push(`\n Execution Time: ${executionTime} ms`)

        this.history.push({code,logs});

        this.render(logs);
    }

    format(args){
        return args.map((arg)=>typeof arg==="object"?JSON.stringify(arg,null,2):String(arg)).join(" ");
    }

    render(logs){
        this.outputElement.textContent = logs.join("\n");
    }

    clear(){
        this.outputElement.textContent="";
    }
}


const output = document.getElementById("output");
const runBtn = document.getElementById("run-btn");
const clearBtn = document.getElementById("clear-btn");
const codeInput = document.getElementById("code-input");

const jsPlayground = new JSPlayground(output);

runBtn.addEventListener("click",()=>{
    jsPlayground.run(codeInput.value);
})

clearBtn.addEventListener("click",()=>{
    jsPlayground.clear();
})

codeInput.value =`
//Try writing JS Here
const nums = [1, 2, 3];

const doubled = nums.map(n => n * 2);

console.log("Doubled:", doubled);
`;