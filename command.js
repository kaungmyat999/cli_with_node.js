const {addCustomer,findCustomer, updateCustomer, deleteCustomer, findAll}= require("./index");
const { program } = require('commander');
const {prompt} = require('inquirer');

const questions=[
    {
        type:'input',
        name:'firstName',
        message:'Customer First Name'
    },
    {
        type:'input',
        name:'secondName',
        message:"Customer Second Name"
    },
    {
        type:'input',
        name:'phone',
        message:"Custoemr Phone Number"
    },
    {
        type:'input',
        name:"email",
        message:"Customer Email"
    }
]
program
    .version('0.0.1')
    .description("Client Mangement System");

// program
//     .command('add <firstName> <secondName> <phone> <email>')
//     .description('Add new Customer')
//     .alias('a')
//     .action((firstName,secondName,phone,email)=>{
//         addCustomer({firstName,secondName,phone,email})
//     })
program
    .command('find all')
    .description('Find All Customers')
    .alias('fA')
    .action(()=>findAll() )
    
program
    .command('add')
    .description('Add new Customer')
    .alias('a')
    .action(()=>{
        prompt(questions).then(answer => addCustomer(answer));
    })
program
    .command('find <name>')
    .alias('f')
    .description("Find Customer")
    .action(name=>findCustomer(name))

program
    .command('update <id>')
    .alias('u')
    .description("Update Customer")
    .action((id)=>{
        prompt(questions).then(answer => updateCustomer(id, answer));
    })

program 
    .command('remove <id>')
    .alias('d')
    .description("Delete Customer")
    .action((id)=> deleteCustomer(id));

program.parse(process.argv);

