var inquirer = require("inquirer");
var Manager = require('./lib/Manager.js');
var Engineer = require('./lib/Engineer.js');
var Intern = require('./lib/Intern.js');
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

    buildTeam(Employees);
};

function getTemplateHTML(employee) {
    switch (employee.role) {
        case 'Manager':
            var specialLabel = 'Office Number';
            var special = employee.officeNumber;
            var logo = 'mug-hot';
            break;
        case 'Engineer':
            var specialLabel = 'GitHub';
            var special = employee.github;
            var logo = 'glasses';
            break;
        case 'Intern':
            var specialLabel = 'School';
            var special = employee.school;
            var logo = 'user-graduate';
            break;
    }

    return `
    <div class="card  mb-3" style="max-width: 16rem;">
        <div class="card-header text-white bg-primary">
            <h4>Jared</4>
                <h5><i class="fas fa-${logo}"></i> ${employee.role}</h5>
        </div>
        <div class="card-body px-0">
            <div class="container">
                <div class="col">
                    <div class="row border p-2">
                        <span>ID: ${employee.id}</span>
                    </div>
                    <div class="row border p-2">
                        <span>Email: <a href="">${employee.email}</a></span>
                    </div>
                    <div class="row border p-2">
                        <span>${specialLabel}: ${special}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function buildTeam(Employees = []) {
    Employees.forEach(employee => {
        switch (employee.role) {
            case 'Manager':
                employee = new Manager(employee.name, employee.id, employee.email, employee.officeNumber)
                var specialLabel = 'Office Number';
                var special = employee.officeNumber;
                var logo = 'mug-hot';
                break;
            case 'Engineer':
                employee = new Engineer(employee.name, employee.id, employee.email, employee.github)
                var specialLabel = 'GitHub';
                var special = employee.github;
                var logo = 'glasses';
                break;
            case 'Intern':
                employee = new Intern(employee.name, employee.id, employee.email, employee.school)
                var specialLabel = 'School';
                var special = employee.school;
                var logo = 'user-graduate';
                break;
        }
        
        employeeHTML = `
        <div class="card  mb-3" style="max-width: 16rem;">
            <div class="card-header text-white bg-primary">
                <h4>Jared</4>
                    <h5><i class="fas fa-${logo}"></i> ${employee.role}</h5>
            </div>
            <div class="card-body px-0">
                <div class="container">
                    <div class="col">
                        <div class="row border p-2">
                            <span>ID: ${employee.id}</span>
                        </div>
                        <div class="row border p-2">
                            <span>Email: <a href="">${employee.email}</a></span>
                        </div>
                        <div class="row border p-2">
                            <span>${specialLabel}: ${special}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        console.log(employeeHTML)
        //append HTML to main.html

    })
}



main();
