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

    return `<div class="card  mb-3" style="max-width: 16rem;">
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
