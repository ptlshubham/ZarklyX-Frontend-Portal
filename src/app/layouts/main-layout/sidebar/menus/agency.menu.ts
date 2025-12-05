import { MenuItem } from '../menu.model';

// Agency/Freelancer Menu Configuration
export const agencyMenu: MenuItem[] = [
    // Dashboard
    {
        id: 1,
        label: 'Dashboard',
        icon: 'ki-filled ki-element-11',
        link: '/dashboard'
    },
    // Business Operations
    {
        id: 2,
        label: 'Business Operations',
        isTitle: true,
    },
    // Client Management
    {
        id: 3,
        label: 'Client Management',
        icon: 'ki-filled ki-users',
        subItems: [
            {
                id: 4,
                label: 'Add New Client',
                link: '/agency/agency-clients/add-client',
                parentId: 3
            },
            {
                id: 5,
                label: 'Client List',
                link: '/agency/agency-clients/client-list',
                parentId: 3
            },
            {
                id: 6,
                label: 'Client Profiles',
                link: '/agency/clients/profiles',
                parentId: 3
            },
            {
                id: 7,
                label: 'Activity Timeline',
                link: '/agency/clients/activity-timeline',
                parentId: 3
            },
            {
                id: 8,
                label: 'Notes & Attachments',
                link: '/agency/clients/notes',
                parentId: 3
            },
            {
                id: 9,
                label: 'Contracts & Agreements',
                link: '/agency/clients/contracts',
                parentId: 3
            },
            {
                id: 10,
                label: 'Client Schedules',
                link: '/agency/clients/schedules',
                parentId: 3
            }
        ]
    },
    // Employee Management
    {
        id: 11,
        label: 'Employee Management',
        icon: 'ki-filled ki-users',
        subItems: [
            {
                id: 12,
                label: 'Employee Directory',
                link: '/agency/employees/directory',
                parentId: 11
            },
            {
                id: 13,
                label: 'Add Employee',
                link: '/agency/agency-employee/add-employee',
                parentId: 11
            },
            {
                id: 14,
                label: 'Departments',
                link: '/agency/employees/departments',
                parentId: 11
            },
            {
                id: 15,
                label: 'Roles & Permissions',
                link: '/agency/employees/roles-permissions',
                parentId: 11
            },
            {
                id: 16,
                label: 'Access Control',
                link: '/agency/employees/access-control',
                parentId: 11
            }
        ]
    },
    // Token/Queue System
    {
        id: 17,
        label: 'Token & Queue System',
        icon: 'ki-filled ki-delivery-time',
        subItems: [
            {
                id: 18,
                label: 'Generate Token',
                link: '/agency/queue/generate',
                parentId: 17
            },
            {
                id: 19,
                label: 'Waiting Queue',
                link: '/agency/queue/waiting',
                parentId: 17
            },
            {
                id: 20,
                label: 'Call Next Token',
                link: '/agency/queue/call-next',
                parentId: 17
            },
            {
                id: 21,
                label: 'Multi Counter',
                link: '/agency/queue/multi-counter',
                parentId: 17
            }
        ]
    },
    // Project & Development Management
    {
        id: 22,
        label: 'Projects & Development',
        icon: 'ki-filled ki-folder',
        subItems: [
            {
                id: 23,
                label: 'All Projects',
                link: '/agency/projects/list',
                parentId: 22
            },
            {
                id: 24,
                label: 'Create Project',
                link: '/agency/projects/create',
                parentId: 22
            },
            {
                id: 25,
                label: 'Task Manager',
                link: '/agency/projects/tasks',
                parentId: 22
            },
            {
                id: 26,
                label: 'Kanban Board',
                link: '/agency/projects/kanban',
                parentId: 22
            },
            {
                id: 27,
                label: 'Gantt Timeline',
                link: '/agency/projects/gantt',
                parentId: 22
            },
            {
                id: 28,
                label: 'Milestones',
                link: '/agency/projects/milestones',
                parentId: 22
            },
            {
                id: 29,
                label: 'File & Asset Sharing',
                link: '/agency/projects/files',
                parentId: 22
            }
        ]
    },
    // Cloud & Integrations Section
    {
        id: 30,
        label: 'Cloud & Integrations',
        isTitle: true,
    },
    // Cloud Integrations
    {
        id: 31,
        label: 'Cloud Storage',
        icon: 'ki-filled ki-cloud',
        subItems: [
            {
                id: 32,
                label: 'Google Drive',
                link: '/agency/cloud/google-drive',
                parentId: 31
            },
            {
                id: 33,
                label: 'Dropbox',
                link: '/agency/cloud/dropbox',
                parentId: 31
            },
            {
                id: 34,
                label: 'OneDrive',
                link: '/agency/cloud/onedrive',
                parentId: 31
            },
            {
                id: 35,
                label: 'iCloud',
                link: '/agency/cloud/icloud',
                parentId: 31
            },
            {
                id: 36,
                label: 'Internal File Manager',
                link: '/agency/cloud/file-manager',
                parentId: 31
            }
        ]
    },
    // Reports & Experts Section
    {
        id: 236,
        label: 'Reports & Experts',
        isTitle: true,
    },
    // Reports & Analytics
    {
        id: 37,
        label: 'Reports & Analytics',
        icon: 'ki-filled ki-chart-line-up',
        subItems: [
            {
                id: 38,
                label: 'Project Reports',
                link: '/agency/reports/projects',
                parentId: 37
            },
            {
                id: 39,
                label: 'Client Reports',
                link: '/agency/reports/clients',
                parentId: 37
            },
            {
                id: 40,
                label: 'Employee Performance',
                link: '/agency/reports/employee-performance',
                parentId: 37
            },
            {
                id: 41,
                label: 'Revenue Reports',
                link: '/agency/reports/revenue',
                parentId: 37
            },
            {
                id: 42,
                label: 'Social Media Reports',
                link: '/agency/reports/social-media',
                parentId: 37
            },
            {
                id: 43,
                label: 'Credit Usage Reports',
                link: '/agency/reports/credit-usage',
                parentId: 37
            },
            {
                id: 44,
                label: 'Campaign Performance',
                link: '/agency/reports/campaign-performance',
                parentId: 37
            }
        ]
    },
    // Expert Sessions
    {
        id: 68,
        label: 'Expert Sessions',
        icon: 'ki-filled ki-teacher',
        subItems: [
            {
                id: 69,
                label: 'Live Workshops',
                link: '/agency/expert-sessions/live-workshops',
                parentId: 68
            },
            {
                id: 70,
                label: 'Recorded Sessions',
                link: '/agency/expert-sessions/recorded',
                parentId: 68
            },
            {
                id: 71,
                label: 'Register for Sessions',
                link: '/agency/expert-sessions/register',
                parentId: 68
            },
            {
                id: 72,
                label: 'My Sessions',
                link: '/agency/expert-sessions/my-sessions',
                parentId: 68
            }
        ]
    },
    // Digital Marketing Section
    {
        id: 82,
        label: 'Digital Marketing',
        isTitle: true,
    },
    // Social Media Management Suite
    {
        id: 83,
        label: 'Social Media Management',
        icon: 'ki-filled ki-social-media',
        subItems: [
            {
                id: 84,
                label: 'Platform Connections',
                parentId: 83,
                subItems: [
                    {
                        id: 85,
                        label: 'Instagram',
                        link: '/agency/social-media/connect/instagram',
                        parentId: 84
                    },
                    {
                        id: 86,
                        label: 'Facebook',
                        link: '/agency/social-media/connect/facebook',
                        parentId: 84
                    },
                    {
                        id: 87,
                        label: 'TikTok',
                        link: '/agency/social-media/connect/tiktok',
                        parentId: 84
                    },
                    {
                        id: 88,
                        label: 'YouTube',
                        link: '/agency/social-media/connect/youtube',
                        parentId: 84
                    },
                    {
                        id: 89,
                        label: 'LinkedIn',
                        link: '/agency/social-media/connect/linkedin',
                        parentId: 84
                    },
                    {
                        id: 90,
                        label: 'X (Twitter)',
                        link: '/agency/social-media/connect/twitter',
                        parentId: 84
                    }
                ]
            },
            {
                id: 91,
                label: 'Content Scheduler',
                link: '/agency/social-media/scheduler',
                parentId: 83
            },
            {
                id: 92,
                label: 'Multi-Calendar Planner',
                link: '/agency/social-media/calendar',
                parentId: 83
            },
            {
                id: 93,
                label: 'Insights Dashboard',
                link: '/agency/social-media/insights',
                parentId: 83
            },
            {
                id: 94,
                label: 'Platform Analytics',
                parentId: 83,
                subItems: [
                    {
                        id: 95,
                        label: 'Instagram Analytics',
                        link: '/agency/social-media/analytics/instagram',
                        parentId: 94
                    },
                    {
                        id: 96,
                        label: 'Facebook Analytics',
                        link: '/agency/social-media/analytics/facebook',
                        parentId: 94
                    },
                    {
                        id: 97,
                        label: 'TikTok Analytics',
                        link: '/agency/social-media/analytics/tiktok',
                        parentId: 94
                    },
                    {
                        id: 98,
                        label: 'YouTube Analytics',
                        link: '/agency/social-media/analytics/youtube',
                        parentId: 94
                    },
                    {
                        id: 99,
                        label: 'LinkedIn Analytics',
                        link: '/agency/social-media/analytics/linkedin',
                        parentId: 94
                    },
                    {
                        id: 100,
                        label: 'X Analytics',
                        link: '/agency/social-media/analytics/twitter',
                        parentId: 94
                    }
                ]
            },
            {
                id: 101,
                label: 'Bulk Upload Posts',
                link: '/agency/social-media/bulk-upload',
                parentId: 83
            },
            {
                id: 102,
                label: 'Auto Publishing',
                link: '/agency/social-media/auto-publish',
                parentId: 83
            },
            {
                id: 103,
                label: 'Hashtag Suggestions',
                link: '/agency/social-media/hashtags',
                parentId: 83
            }
        ]
    },
    // Influencer Directory (Credits-Based)
    {
        id: 104,
        label: 'Influencer Directory',
        icon: 'ki-filled ki-star',
        subItems: [
            {
                id: 105,
                label: 'Search Influencers',
                link: '/agency/influencers/search',
                parentId: 104
            },
            {
                id: 106,
                label: 'Influencer Profiles',
                link: '/agency/influencers/profiles',
                parentId: 104
            },
            {
                id: 107,
                label: 'Saved Influencers',
                link: '/agency/influencers/saved',
                parentId: 104
            },
            {
                id: 108,
                label: 'Filter by Niche',
                link: '/agency/influencers/filter-niche',
                parentId: 104
            },
            {
                id: 109,
                label: 'Filter by Location',
                link: '/agency/influencers/filter-location',
                parentId: 104
            }
        ]
    },
    // Influencer Collaboration History
    {
        id: 110,
        label: 'Influencer Collaborations',
        icon: 'ki-filled ki-people',
        subItems: [
            {
                id: 111,
                label: 'Past Projects',
                link: '/agency/collaborations/past-projects',
                parentId: 110
            },
            {
                id: 112,
                label: 'Performance Data',
                link: '/agency/collaborations/performance',
                parentId: 110
            },
            {
                id: 113,
                label: 'Communication Logs',
                link: '/agency/collaborations/communications',
                parentId: 110
            },
            {
                id: 114,
                label: 'Deliverables History',
                link: '/agency/collaborations/deliverables',
                parentId: 110
            }
        ]
    },
    // Email Marketing Tools
    {
        id: 115,
        label: 'Email Marketing',
        icon: 'ki-filled ki-sms',
        subItems: [
            {
                id: 116,
                label: 'Campaign Builder',
                link: '/agency/email-marketing/campaign-builder',
                parentId: 115
            },
            {
                id: 117,
                label: 'Email Templates',
                link: '/agency/email-marketing/templates',
                parentId: 115
            },
            {
                id: 118,
                label: 'Contact Lists',
                link: '/agency/email-marketing/contact-lists',
                parentId: 115
            },
            {
                id: 119,
                label: 'Campaign Reports',
                link: '/agency/email-marketing/reports',
                parentId: 115
            }
        ]
    },
    // SEO Tools
    {
        id: 120,
        label: 'SEO Tools',
        icon: 'ki-filled ki-chart-line-up',
        subItems: [
            {
                id: 121,
                label: 'SEO Checker',
                link: '/agency/seo/checker',
                parentId: 120
            },
            {
                id: 122,
                label: 'Keyword Ideas',
                link: '/agency/seo/keywords',
                parentId: 120
            },
            {
                id: 123,
                label: 'Website Audit',
                link: '/agency/seo/audit',
                parentId: 120
            }
        ]
    },
    // Finance & HR Section
    {
        id: 45,
        label: 'Finance & HR',
        isTitle: true,
    },
    // Inventory & Asset Management
    {
        id: 46,
        label: 'Inventory & Assets',
        icon: 'ki-filled ki-package',
        subItems: [
            {
                id: 47,
                label: 'Hardware Inventory',
                link: '/agency/inventory/hardware',
                parentId: 46
            },
            {
                id: 48,
                label: 'Software Licenses',
                link: '/agency/inventory/software',
                parentId: 46
            },
            {
                id: 49,
                label: 'Asset Assignment',
                link: '/agency/inventory/assignments',
                parentId: 46
            },
            {
                id: 50,
                label: 'Warranty & Expiry Alerts',
                link: '/agency/inventory/alerts',
                parentId: 46
            }
        ]
    },
    // Attendance System
    {
        id: 51,
        label: 'Attendance System',
        icon: 'ki-filled ki-calendar',
        subItems: [
            {
                id: 52,
                label: 'Daily Attendance',
                link: '/agency/attendance/daily',
                parentId: 51
            },
            {
                id: 53,
                label: 'Remote Check-In/Out',
                link: '/agency/attendance/remote',
                parentId: 51
            },
            {
                id: 54,
                label: 'Attendance Reports',
                link: '/agency/attendance/reports',
                parentId: 51
            },
            {
                id: 55,
                label: 'Late & Early Insights',
                link: '/agency/attendance/insights',
                parentId: 51
            }
        ]
    },
    // Accounting & Finance
    {
        id: 56,
        label: 'Accounting & Finance',
        icon: 'ki-filled ki-dollar',
        subItems: [
            {
                id: 57,
                label: 'Invoices',
                link: '/agency/accounting/invoices',
                parentId: 56
            },
            {
                id: 58,
                label: 'Estimates & Quotations',
                link: '/agency/accounting/estimates',
                parentId: 56
            },
            {
                id: 59,
                label: 'Expenses & Bills',
                link: '/agency/accounting/expenses',
                parentId: 56
            },
            {
                id: 60,
                label: 'Recurring Billing',
                link: '/agency/accounting/recurring-billing',
                parentId: 56
            },
            {
                id: 61,
                label: 'Payment Gateway',
                link: '/agency/accounting/payment-gateway',
                parentId: 56
            },
            {
                id: 62,
                label: 'Tax Settings',
                link: '/agency/accounting/tax-settings',
                parentId: 56
            }
        ]
    },
    // Payroll System
    {
        id: 63,
        label: 'Payroll System',
        icon: 'ki-filled ki-cheque',
        subItems: [
            {
                id: 64,
                label: 'Salary Structure',
                link: '/agency/payroll/salary-structure',
                parentId: 63
            },
            {
                id: 65,
                label: 'Salary Sheet',
                link: '/agency/payroll/salary-sheet',
                parentId: 63
            },
            {
                id: 66,
                label: 'Bonus & Deductions',
                link: '/agency/payroll/bonus-deductions',
                parentId: 63
            },
            {
                id: 67,
                label: 'Salary Slips',
                link: '/agency/payroll/salary-slips',
                parentId: 63
            }
        ]
    },

    // IT Management
    {
        id: 73,
        label: 'IT Management',
        icon: 'ki-filled ki-technology-4',
        subItems: [
            {
                id: 74,
                label: 'IT Tickets',
                link: '/agency/it/tickets',
                parentId: 73
            },
            {
                id: 75,
                label: 'IT Asset Records',
                link: '/agency/it/assets',
                parentId: 73
            },
            {
                id: 76,
                label: 'Access Permissions',
                link: '/agency/it/access-permissions',
                parentId: 73
            }
        ]
    },
    // Human Resource (HR) Tools
    {
        id: 77,
        label: 'Human Resources',
        icon: 'ki-filled ki-badge',
        subItems: [
            {
                id: 78,
                label: 'Leave Requests',
                link: '/agency/hr/leave-requests',
                parentId: 77
            },
            {
                id: 79,
                label: 'Employee Policies',
                link: '/agency/hr/policies',
                parentId: 77
            },
            {
                id: 80,
                label: 'Employee Documents',
                link: '/agency/hr/documents',
                parentId: 77
            },
            {
                id: 81,
                label: 'HR Announcements',
                link: '/agency/hr/announcements',
                parentId: 77
            }
        ]
    },
    // Marketing & Sales Section
    {
        id: 124,
        label: 'Marketing & Sales',
        isTitle: true,
    },
    // Marketing & Sales CRM
    {
        id: 125,
        label: 'Sales & Marketing',
        icon: 'ki-filled ki-abstract-26',
        subItems: [
            {
                id: 126,
                label: 'Lead Capture',
                link: '/agency/crm/lead-capture',
                parentId: 125
            },
            {
                id: 127,
                label: 'Lead Lists',
                link: '/agency/crm/lead-lists',
                parentId: 125
            },
            {
                id: 128,
                label: 'Sales Pipeline',
                link: '/agency/crm/sales-pipeline',
                parentId: 125
            },
            {
                id: 129,
                label: 'Follow-up Reminders',
                link: '/agency/crm/follow-up',
                parentId: 125
            },
            {
                id: 130,
                label: 'Client Onboarding',
                link: '/agency/crm/onboarding',
                parentId: 125
            }
        ]
    },
];
