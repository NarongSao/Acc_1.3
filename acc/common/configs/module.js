Module = typeof Module === 'undefined' ? {} : Module;

Module.Acc = {
    name: 'Accounting System',
    version: '2.0.0',
    summary: 'Accounting Management System is ...',
    roles: [
        'setting',
        'data-insert',
        'data-update',
        'data-remove',
        'reporter'
    ],
    dump: {
        setting: [
            'acc_location'
        ],
        data: [
            'acc_customer',
            'acc_order'
        ]
    }
};
