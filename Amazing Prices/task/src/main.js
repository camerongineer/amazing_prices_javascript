function Product(plan, price, users, storage, isPrivate, hasSharing, hasUnlimitedMembers, hasExtraSecurity) {
    this.plan = plan;
    this.price = price;
    this.users = users;
    this.storage = storage;
    this.isPublic = true;
    this.isPrivate = isPrivate;
    this.hasPermissions = true
    this.hasSharing = hasSharing;
    this.hasUnlimitedMembers = hasUnlimitedMembers;
    this.hasExtraSecurity = hasExtraSecurity;
    this.hasEmailAccess = true;
    this.hasHelpCenterAccess = true;
}

const plans = [
    new Product('Free', '0', 10, 2, false, false, false, false),
    new Product('Pro', '15', 20, 5, true, true, true, false),
    new Product('Premium', '29', 30, 10, true, true, true, true)
];

const enterprisePlan = new Product('Enterprise', 'Lots', -1, 100, true, true, true, true);

function buildCard(plan) {
    document.getElementById('cards').innerHTML +=
        `<div class="card">
            <div class="card-header">
                <h4>${plan.plan}</h4>
            </div>
            <div class="card-body">
                <h3>$${plan.price}/mo</h3>
                <p>${plan.users} users included</p>
                <p>${plan.storage} GB of storage</p>
                ${plan.hasEmailAccess ? '<p>Email support</p>' : ''}
                ${plan.hasHelpCenterAccess ? '<p>Help center Access</p>' : ''}
                <button>${plan.price > 0 ? 'Get started' : 'Sign up for free'}</button>
            </div>
        </div>`;
}

function buildTable(plans) {
    plans.pop();
    plans.push(enterprisePlan);
    const table = document.getElementById('table-compare');
    table.innerHTML +=
        `<thead id="table-compare-head">
            <tr id="table-row-plans">
                <th id="row-features"></th>
            </tr>
        </thead>
        <tbody>
            <tr id="table-row-public">
                <th>Public</th>
            </tr>
            <tr id="table-row-private">
                <th>Private</th>
            </tr>
            <tr id="table-row-permissions">
                <th>Permissions</th>
            </tr>
            <tr id="table-row-sharing">
                <th>Sharing</th>
            </tr>
            <tr id="table-row-unlimited-members">
                <th>Unlimited Members</th>
            </tr>
            <tr id="table-row-extra-security">
                <th>Extra Security</th>
            </tr>
        </tbody>`;
    plans.forEach(plan => {
        buildFeatureRow(plan.plan, 'th', 'table-row-plans');
        buildFeatureRow(plan.isPublic, 'td', 'table-row-public');
        buildFeatureRow(plan.isPrivate, 'td', 'table-row-private');
        buildFeatureRow(plan.hasPermissions, 'td', 'table-row-permissions');
        buildFeatureRow(plan.hasSharing, 'td', 'table-row-sharing');
        buildFeatureRow(plan.hasUnlimitedMembers, 'td', 'table-row-unlimited-members');
        buildFeatureRow(plan.hasExtraSecurity, 'td', 'table-row-extra-security');
    });
}

function buildFeatureRow(content, tag, elementId) {
    const feature = document.createElement(tag);
    feature.innerHTML = !content ? '' : content === true ? 'X' : content;
    document.getElementById(elementId).appendChild(feature);
}

plans.forEach(buildCard);
buildTable(plans);