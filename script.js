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

        let timeClass ="fast";

        if(executionTime>50) timeClass="medium";

        if(executionTime>100) timeClass="slow";

        logs.push(`<strong>Execution Time: <span class="${timeClass}">${executionTime} ms</span></strong>`)

        this.history.push({code,logs});

        this.render(logs);
    }

    format(args){
        return args.map((arg)=>typeof arg==="object"?JSON.stringify(arg,null,2):String(arg)).join(" ");
    }

    render(logs){
        this.outputElement.innerHTML = logs.join("<br>");
    }

    clear(){
        this.outputElement.innerHTML="";
    }
}


const output = document.getElementById("output");
const runBtn = document.getElementById("run-btn");
const clearBtn = document.getElementById("clear-btn");
const codeInput = document.getElementById("code-input");
const copyBtn = document.getElementById("copy-btn");

const jsPlayground = new JSPlayground(output);

runBtn.addEventListener("click",()=>{
    jsPlayground.run(codeInput.value);
})

clearBtn.addEventListener("click",()=>{
    jsPlayground.clear();
})

copyBtn.addEventListener("click",()=>{
    navigator.clipboard.writeText(codeInput.value).then(()=>{
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        copyBtn.classList.add("success");

        setTimeout(()=>{
            copyBtn.textContent=originalText;
            copyBtn.classList.remove("success");
        },2000);
    })
})

codeInput.value =`
//Try writing JS Here
const nums = [1, 2, 3];

const doubled = nums.map(n => n * 2);

console.log("Doubled:", doubled);
`;