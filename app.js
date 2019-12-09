var inquirer = require("inquirer");
var Manager = require('./lib/Manager.js');
var Engineer = require('./lib/Engineer.js');
var Intern = require('./lib/Intern.js');
fs = require('fs')
var id = 1;




const collectInputs = async (Employees = []) => {
    const prompts = [
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the employee: '
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of the employee?',
            choices: ['Manager', 'Engineer', 'Intern'],
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the employee: '
        },
        {
            when: function (response) {
                if (response.role === 'Manager') {
                    return response.role;
                }
            },
            name: 'officeNumber',
            message: 'What is this managers office number?'
        },
        {
            when: function (response) {
                if (response.role === 'Engineer') {
                    return response.role;
                }
            },
            name: 'github',
            message: 'What is the engineers github user-name?'
        },
        {
            when: function (response) {
                if (response.role === 'Intern') {
                    return response.role;
                }
            },
            name: 'school',
            message: 'What school is the intern from?'
        },
        {
            type: 'confirm',
            name: 'again',
            message: 'Add another employee to the team? ',
            default: true
        }
    ];

    const { again, ...answers } = await inquirer.prompt(prompts);
    answers.id = id;
    id++;
    const newEmployees = [...Employees, answers];
    return again ? collectInputs(newEmployees) : newEmployees;
};


const main = async () => {
    const Employees = await collectInputs();
    console.log(Employees);

    HTML = buildTeam(Employees);
    writeToHtml(HTML)
    loadServer();
    
};


function buildTeam(Employees = []) {
    var HTML = "";
    Employees.forEach(e => {
        switch (e.role) {
            case 'Manager':
                e = new Manager(e.name, e.id, e.email, e.officeNumber)
                var specialLabel = 'Office Number';
                var special = e.officeNumber;
                var logo = 'mug-hot';
                break;
            case 'Engineer':
                e = new Engineer(e.name, e.id, e.email, e.github)
                var specialLabel = 'GitHub';
                var special = e.github;
                var logo = 'glasses';
                break;
            case 'Intern':
                e = new Intern(e.name, e.id, e.email, e.school)
                var specialLabel = 'School';
                var special = e.school;
                var logo = 'user-graduate';
                break;
        }
        
        employeeHTML = `
        <div class="card  mb-3" style="max-width: 16rem;">
            <div class="card-header text-white bg-primary">
                <h4>${e.name}</4>
                    <h5><i class="fas fa-${logo}"></i> ${e.role}</h5>
            </div>
            <div class="card-body px-0">
                <div class="container">
                    <div class="col">
                        <div class="row border p-2">
                            <span>ID: ${e.id}</span>
                        </div>
                        <div class="row border p-2">
                            <span>Email: <a href="">${e.email}</a></span>
                        </div>
                        <div class="row border p-2">
                            <span>${specialLabel}: ${special}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        HTML += employeeHTML
    })
    return HTML;
}



function writeToHtml(snippet){
    fs.writeFile('./output/team.html', "", 'utf8', function (err) {
        if (err) return console.log(err);
     });    
    fs.readFile('./output/main.html', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\<\/body>/g, snippet + '</body>');
        fs.writeFile('./output/team.html', data, 'utf8', function (err) {
            if (err) return console.log(err);
         });
        });
    };

function loadServer(){
    var path = require("path");
    const express = require('express');

    const app = new express();

    const router = express.Router();

    router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/output/team.html'));
    });

    app.use('/', router);
    app.listen(process.env.port || 3000);

    console.log('Running at Port 3000');

}

main();
