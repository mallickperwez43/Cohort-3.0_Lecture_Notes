const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
.name('counter')
.description('CLI to do file based task')
.version('0.8.0')

program.command('countLines')
.description('Count the number of lines in a file')
.argument('<file>', 'file to count')
.action((file)=>{
    fs.readFile(file, 'utf-8', (err, contents)=>{
        if(err){
            console.log(err);
        }
        else{
            const lines = contents.split('\n').length;
            console.log(`There are ${lines} lines in ${file}`);
        }
    })
})

program.command('countWords')
.description('Count the number of words in a file')
.argument('<file>', 'file to count')
.action((file)=>{
    fs.readFile(file, 'utf-8', (err, contents)=>{
        if(err){
            console.log(err);
        }
        else{
            const words = contents.split(' ').length;
            console.log(words + 1);
        }
    })
})

program.parse();
