var inquirer = require("inquirer");
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
                if(response.role === 'Manager'){
                    return response.role;
                }
            },
            name: 'officeNumber',
            message: 'What is this managers office number?'
        },
        {
            when: function (response) {
                if(response.role === 'Engineer'){
                    return response.role;
                }
            },
            name: 'github',
            message: 'What is the engineers github user-name?'
        },
        {
            when: function (response) {
                if(response.role === 'Intern'){
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
};

main();
