import { MenuItem } from './super-admin-menu.model';

// Super Admin Menu Configuration
export const superAdminMenu: MenuItem[] = [
    // Dashboard
    {
        id: 1,
        label: 'Dashboard',
        icon: 'ki-filled ki-element-11',
        link: '/super-admin'
    },
    // Management Section
    {
        id: 2,
        label: 'Management',
        isTitle: true,
    },
    // Subscription & Billing
    {
        id: 3,
        label: 'Subscription & Billing',
        icon: 'ki-filled ki-bank',
        subItems: [
            {
                id: 4,
                label: 'Plans',
                parentId: 3,
                subItems: [
                    {
                        id: 5,
                        label: 'Manage Plans',
                        link: '/super-admin/subscription/plans/manage',
                        parentId: 4
                    },
                    {
                        id: 6,
                        label: 'Create Plans',
                        link: '/super-admin/subscription/plans/create',
                        parentId: 4
                    },
                    {
                        id: 7,
                        label: 'Plan Features',
                        link: '/super-admin/subscription/plans/features',
                        parentId: 4
                    }
                ]
            },
            {
                id: 8,
                label: 'Free Trial',
                link: '/super-admin/subscription/free-trial',
                parentId: 3
            },
            {
                id: 9,
                label: 'Coupons',
                link: '/super-admin/subscription/coupons',
                parentId: 3
            },
            {
                id: 10,
                label: 'Renewal & Billing Logs',
                link: '/super-admin/subscription/renewal-logs',
                parentId: 3
            },
            {
                id: 11,
                label: 'Billing Logs',
                link: '/super-admin/subscription/billing-logs',
                parentId: 3
            }
        ]
    },
    // Agency Management
    {
        id: 12,
        label: 'Agency Management',
        icon: 'ki-filled ki-social-media',
        subItems: [
            {
                id: 13,
                label: 'Agencies',
                link: '/super-admin/agencies/list',
                parentId: 12
            },
            {
                id: 14,
                label: 'Approvals',
                parentId: 12,
                subItems: [
                    {
                        id: 15,
                        label: 'Pending',
                        link: '/super-admin/agencies/approvals/pending',
                        parentId: 14
                    },
                    {
                        id: 16,
                        label: 'Approved',
                        link: '/super-admin/agencies/approvals/approved',
                        parentId: 14
                    },
                    {
                        id: 17,
                        label: 'Rejected',
                        link: '/super-admin/agencies/approvals/rejected',
                        parentId: 14
                    }
                ]
            },
            {
                id: 18,
                label: 'KYC / Documents',
                link: '/super-admin/agencies/kyc',
                parentId: 12
            },
            {
                id: 19,
                label: 'Signup Settings',
                parentId: 12,
                subItems: [
                    {
                        id: 20,
                        label: 'Business Category Management',
                        link: '/super-admin/agencies/categories',
                        parentId: 19
                    },
                    {
                        id: 21,
                        label: 'Premium Features',
                        link: '/super-admin/agencies/premium-features',
                        parentId: 19
                    }
                ]
            },
            // {
            //     id: 22,
            //     label: 'Business Category Manager',
            //     link: '/super-admin/agencies/categories',
            //     parentId: 12
            // },
            // {
            //     id: 23,
            //     label: 'Premium Feature Control',
            //     link: '/super-admin/agencies/premium-features',
            //     parentId: 12
            // },
            {
                id: 24,
                label: 'Usage Insights',
                parentId: 12,
                subItems: [
                    {
                        id: 25,
                        label: 'Credits Usage',
                        link: '/super-admin/agencies/usage/credits',
                        parentId: 24
                    },
                    {
                        id: 26,
                        label: 'Storage Usage',
                        link: '/super-admin/agencies/usage/storage',
                        parentId: 24
                    },
                    {
                        id: 27,
                        label: 'Social Accounts',
                        link: '/super-admin/agencies/usage/social-accounts',
                        parentId: 24
                    }
                ]
            }
        ]
    },
    // Influencer Management
    {
        id: 28,
        label: 'Influencer Management',
        icon: 'ki-filled ki-users',
        subItems: [
            {
                id: 29,
                label: 'All Influencers',
                link: '/super-admin/influencers/list',
                parentId: 28
            },
            {
                id: 30,
                label: 'Approvals',
                link: '/super-admin/influencers/approvals',
                parentId: 28
            },
            {
                id: 31,
                label: 'Categories',
                parentId: 28,
                subItems: [
                    {
                        id: 32,
                        label: 'Category',
                        link: '/super-admin/influencers/categories',
                        parentId: 31
                    },
                    {
                        id: 33,
                        label: 'Sub-category',
                        link: '/super-admin/influencers/sub-categories',
                        parentId: 31
                    }
                ]
            },
            {
                id: 34,
                label: 'Platforms',
                parentId: 28,
                subItems: [
                    {
                        id: 35,
                        label: 'Instagram',
                        link: '/super-admin/influencers/platforms/instagram',
                        parentId: 34
                    },
                    {
                        id: 36,
                        label: 'Facebook',
                        link: '/super-admin/influencers/platforms/facebook',
                        parentId: 34
                    },
                    {
                        id: 37,
                        label: 'TikTok',
                        link: '/super-admin/influencers/platforms/tiktok',
                        parentId: 34
                    },
                    {
                        id: 38,
                        label: 'YouTube',
                        link: '/super-admin/influencers/platforms/youtube',
                        parentId: 34
                    }
                ]
            },
            {
                id: 39,
                label: 'Influencer Health & Stats',
                link: '/super-admin/influencers/health-stats',
                parentId: 28
            },
            {
                id: 40,
                label: 'Influencer KYC',
                link: '/super-admin/influencers/kyc',
                parentId: 28
            }
        ]
    },
    // Credits Management
    {
        id: 41,
        label: 'Credits Management',
        icon: 'ki-filled ki-dollar',
        subItems: [
            {
                id: 42,
                label: 'Credit Packages',
                link: '/super-admin/credits/packages',
                parentId: 41
            },
            {
                id: 43,
                label: 'Credit Pricing',
                link: '/super-admin/credits/pricing',
                parentId: 41
            },
            {
                id: 44,
                label: 'Manual Credit Adjustment',
                link: '/super-admin/credits/manual-adjustment',
                parentId: 41
            },
            {
                id: 45,
                label: 'Credit Purchase History',
                link: '/super-admin/credits/purchase-history',
                parentId: 41
            },
            {
                id: 46,
                label: 'Credit Usage Reports',
                link: '/super-admin/credits/usage-reports',
                parentId: 41
            }
        ]
    },
    // Platform Integrations
    {
        id: 47,
        label: 'Platform Integrations',
        icon: 'ki-filled ki-technology-2',
        subItems: [
            {
                id: 48,
                label: 'Social APIs',
                parentId: 47,
                subItems: [
                    {
                        id: 46,
                        label: 'Instagram API',
                        link: '/super-admin/integrations/social/instagram',
                        parentId: 45
                    },
                    {
                        id: 47,
                        label: 'Facebook API',
                        link: '/super-admin/integrations/social/facebook',
                        parentId: 45
                    },
                    {
                        id: 48,
                        label: 'TikTok API',
                        link: '/super-admin/integrations/social/tiktok',
                        parentId: 45
                    },
                    {
                        id: 49,
                        label: 'YouTube API',
                        link: '/super-admin/integrations/social/youtube',
                        parentId: 45
                    }
                ]
            },
            {
                id: 53,
                label: 'Cloud Integrations',
                parentId: 47,
                subItems: [
                    {
                        id: 54,
                        label: 'AWS',
                        link: '/super-admin/integrations/cloud/aws',
                        parentId: 53
                    },
                    {
                        id: 55,
                        label: 'GCP',
                        link: '/super-admin/integrations/cloud/gcp',
                        parentId: 53
                    },
                    {
                        id: 56,
                        label: 'Azure',
                        link: '/super-admin/integrations/cloud/azure',
                        parentId: 53
                    }
                ]
            },
            {
                id: 57,
                label: 'SMTP & SMS',
                parentId: 47,
                subItems: [
                    {
                        id: 58,
                        label: 'SMTP Configuration',
                        link: '/super-admin/integrations/smtp',
                        parentId: 57
                    },
                    {
                        id: 59,
                        label: 'SMS Gateway',
                        link: '/super-admin/integrations/sms',
                        parentId: 57
                    }
                ]
            }
        ]
    },
    // System Content
    {
        id: 60,
        label: 'System Content',
        icon: 'ki-filled ki-social-media',
        subItems: [
            {
                id: 61,
                label: 'Blog Management',
                link: '/super-admin/content/blogs',
                parentId: 60
            },
            {
                id: 62,
                label: 'CMS',
                parentId: 60,
                subItems: [
                    {
                        id: 60,
                        label: 'Privacy Policy',
                        link: '/super-admin/content/cms/privacy',
                        parentId: 59
                    },
                    {
                        id: 61,
                        label: 'Terms & Conditions',
                        link: '/super-admin/content/cms/terms',
                        parentId: 59
                    },
                    {
                        id: 62,
                        label: 'Refund Policy',
                        link: '/super-admin/content/cms/refund',
                        parentId: 59
                    }
                ]
            },
            {
                id: 63,
                label: 'FAQs',
                link: '/super-admin/content/faqs',
                parentId: 57
            },
            {
                id: 64,
                label: 'Email Templates',
                link: '/super-admin/content/email-templates',
                parentId: 57
            },
            {
                id: 65,
                label: 'SMS Templates',
                link: '/super-admin/content/sms-templates',
                parentId: 57
            },
            {
                id: 66,
                label: 'Push Notification Templates',
                link: '/super-admin/content/push-templates',
                parentId: 57
            }
        ]
    },
    // Support & Tickets
    {
        id: 70,
        label: 'Support & Tickets',
        icon: 'ki-filled ki-messages',
        subItems: [
            {
                id: 71,
                label: 'All Tickets',
                link: '/super-admin/tickets/all',
                parentId: 70
            },
            {
                id: 72,
                label: 'Assign Tickets',
                link: '/super-admin/tickets/assign',
                parentId: 70
            },
            {
                id: 73,
                label: 'Departments',
                parentId: 70,
                subItems: [
                    {
                        id: 71,
                        label: 'Teams',
                        link: '/super-admin/tickets/departments/teams',
                        parentId: 70
                    },
                    {
                        id: 72,
                        label: 'SLA',
                        link: '/super-admin/tickets/departments/sla',
                        parentId: 70
                    },
                    {
                        id: 73,
                        label: 'Escalation',
                        link: '/super-admin/tickets/departments/escalation',
                        parentId: 70
                    }
                ]
            },
            {
                id: 74,
                label: 'Ticket SLAs',
                link: '/super-admin/tickets/slas',
                parentId: 67
            },
            {
                id: 75,
                label: 'Agent Performance',
                link: '/super-admin/tickets/agent-performance',
                parentId: 67
            }
        ]
    },
    // Technical Access
    {
        id: 79,
        label: 'Technical Access',
        icon: 'ki-filled ki-shield',
        subItems: [
            {
                id: 80,
                label: 'Support PIN System',
                link: '/super-admin/security/pin',
                parentId: 79
            },
            {
                id: 81,
                label: 'Temporary Client Access',
                link: '/super-admin/security/temp-access',
                parentId: 79
            }
        ]
    },
    // Reviews & Feedback
    {
        id: 82,
        label: 'Reviews & Feedback',
        icon: 'ki-filled ki-star',
        subItems: [
            {
                id: 83,
                label: 'Agency Reviews',
                link: '/super-admin/reviews/agencies',
                parentId: 82
            },
            {
                id: 84,
                label: 'Influencer Reviews',
                link: '/super-admin/reviews/influencers',
                parentId: 82
            },
            {
                id: 85,
                label: 'System Feedback',
                link: '/super-admin/reviews/system-feedback',
                parentId: 82
            }
        ]
    },
    // Transactions & Payments
    {
        id: 86,
        label: 'Transactions & Payments',
        icon: 'ki-filled ki-cheque',
        subItems: [
            {
                id: 87,
                label: 'Subscription Payments',
                link: '/super-admin/payments/subscriptions',
                parentId: 86
            },
            {
                id: 88,
                label: 'Credit Purchases',
                link: '/super-admin/payments/credits',
                parentId: 86
            },
            {
                id: 89,
                label: 'Payouts',
                parentId: 86,
                subItems: [
                    {
                        id: 90,
                        label: 'Influencer Payouts',
                        link: '/super-admin/payments/payouts/influencers',
                        parentId: 89
                    },
                    {
                        id: 91,
                        label: 'Agency Payouts',
                        link: '/super-admin/payments/payouts/agencies',
                        parentId: 89
                    }
                ]
            },
            {
                id: 92,
                label: 'Refund Requests',
                link: '/super-admin/payments/refunds',
                parentId: 86
            },
            {
                id: 93,
                label: 'Transaction Logs',
                link: '/super-admin/payments/transactions-log',
                parentId: 86
            }
        ]
    },
    // Reports & Analytics Section
    {
        id: 94,
        label: 'Reports & Analytics',
        isTitle: true,
    },
    {
        id: 95,
        label: 'Reports',
        icon: 'ki-filled ki-chart-line-up',
        subItems: [
            {
                id: 96,
                label: 'Agency Reports',
                link: '/super-admin/reports/agencies',
                parentId: 95
            },
            {
                id: 97,
                label: 'Influencer Reports',
                link: '/super-admin/reports/influencers',
                parentId: 95
            },
            {
                id: 98,
                label: 'Subscription Reports',
                link: '/super-admin/reports/subscriptions',
                parentId: 95
            },
            {
                id: 99,
                label: 'Revenue Reports',
                link: '/super-admin/reports/revenue',
                parentId: 95
            },
            {
                id: 100,
                label: 'Platform Usage',
                parentId: 95,
                subItems: [
                    {
                        id: 98,
                        label: 'Daily Active Users',
                        link: '/super-admin/reports/usage/daily-active',
                        parentId: 97
                    },
                    {
                        id: 99,
                        label: 'Monthly Active Users',
                        link: '/super-admin/reports/usage/monthly-active',
                        parentId: 97
                    },
                    {
                        id: 100,
                        label: 'Feature Usage',
                        link: '/super-admin/reports/usage/features',
                        parentId: 97
                    }
                ]
            },
            {
                id: 101,
                label: 'Credit Reports',
                link: '/super-admin/reports/credits',
                parentId: 92
            },
            {
                id: 102,
                label: 'Cloud Storage Reports',
                link: '/super-admin/reports/storage',
                parentId: 92
            },
            {
                id: 103,
                label: 'Monthly Growth Reports',
                link: '/super-admin/reports/growth',
                parentId: 92
            },
            {
                id: 104,
                label: 'Conversion Funnel Reports',
                link: '/super-admin/reports/funnel',
                parentId: 92
            }
        ]
    },
    // Logs & Monitoring Section
    {
        id: 108,
        label: 'Logs & Monitoring',
        isTitle: true,
    },
    {
        id: 109,
        label: 'Logs & Monitoring',
        icon: 'ki-filled ki-note-2',
        subItems: [
            {
                id: 110,
                label: 'Activity Logs',
                link: '/super-admin/logs/activity',
                parentId: 109
            },
            {
                id: 111,
                label: 'Login Logs',
                link: '/super-admin/logs/login',
                parentId: 109
            },
            {
                id: 112,
                label: 'Email/SMS Logs',
                link: '/super-admin/logs/email-sms',
                parentId: 109
            },
            {
                id: 113,
                label: 'API Logs',
                link: '/super-admin/logs/api',
                parentId: 109
            },
            {
                id: 114,
                label: 'Error Tracking',
                link: '/super-admin/logs/errors',
                parentId: 109
            }
        ]
    },
    // Automation Engine Section
    {
        id: 115,
        label: 'Automation Engine',
        isTitle: true,
    },
    {
        id: 116,
        label: 'Automation Engine',
        icon: 'ki-filled ki-rocket',
        subItems: [
            {
                id: 117,
                label: 'Auto Subscription Emails',
                link: '/super-admin/automation/subscription-emails',
                parentId: 116
            },
            {
                id: 118,
                label: 'Auto Lead Assignment',
                link: '/super-admin/automation/lead-assignment',
                parentId: 116
            },
            {
                id: 119,
                label: 'Auto Ticket Assignment',
                link: '/super-admin/automation/ticket-assignment',
                parentId: 116
            },
            {
                id: 120,
                label: 'Auto Reminder System',
                link: '/super-admin/automation/reminders',
                parentId: 116
            }
        ]
    },
    // White Labeling Section
    {
        id: 121,
        label: 'White Labeling',
        isTitle: true,
    },
    {
        id: 122,
        label: 'White Labeling',
        icon: 'ki-filled ki-brush',
        subItems: [
            {
                id: 123,
                label: 'Custom Domain',
                link: '/super-admin/branding/domain',
                parentId: 122
            },
            {
                id: 124,
                label: 'Custom Logo',
                link: '/super-admin/branding/logo',
                parentId: 122
            },
            {
                id: 125,
                label: 'Theme Colors',
                link: '/super-admin/branding/theme',
                parentId: 122
            },
            {
                id: 126,
                label: 'Custom Email Sender',
                link: '/super-admin/branding/email-sender',
                parentId: 122
            }
        ]
    },
    // Quick Access Section
    {
        id: 127,
        label: 'Quick Access',
        isTitle: true,
    },
    {
        id: 128,
        label: 'Switch to Dashboard',
        icon: 'ki-filled ki-switch',
        link: '/dashboard'
    }
];
