import {OccupationTreeNode} from '../../../types';

export const occupationTreeData: OccupationTreeNode[] = [
    {
        'name': 'Total, all occupations',
        'type': 'Summary',
        'sort': null,
        'displayLevel': 0,
        'code': '00',
    }, {
        'name': 'Management occupations',
        'type': 'Summary',
        'sort': 2,
        'displayLevel': 1,
        'code': '11',
        'children': [{
            'name': 'Top executives',
            'type': 'Summary',
            'sort': 3,
            'displayLevel': 2,
            'category': '11',
            'code': '1000',
            'children': [{
                'name': 'xxx',
                'type': 'xxx',
                'sort': 3,
                'displayLevel': 2,
                'category': '11',
                'code': '1000xxx'
            }]
        }, {
            'name': 'Chief executives',
            'type': 'Line Item',
            'sort': 4,
            'displayLevel': 3,
            'category': '11',
            'code': '1011'
        }, {
            'name': 'General and operations managers',
            'type': 'Line Item',
            'sort': 5,
            'displayLevel': 3,
            'category': '11',
            'code': '1021'
        }, {
            'name': 'Legislators',
            'type': 'Line Item',
            'sort': 6,
            'displayLevel': 3,
            'category': '11',
            'code': '1031'
        }, {
            'name': 'Advertising, marketing, promotions, public relations, and sales managers',
            'type': 'Summary',
            'sort': 7,
            'displayLevel': 2,
            'category': '11',
            'code': '2000'
        }, {
            'name': 'Advertising and promotions managers',
            'type': 'Line Item',
            'sort': 8,
            'displayLevel': 3,
            'category': '11',
            'code': '2011'
        }, {
            'name': 'Marketing and sales managers',
            'type': 'Summary',
            'sort': 9,
            'displayLevel': 3,
            'category': '11',
            'code': '2020'
        }, {
            'name': 'Marketing managers',
            'type': 'Line Item',
            'sort': 10,
            'displayLevel': 4,
            'category': '11',
            'code': '2021'
        }, {
            'name': 'Sales managers',
            'type': 'Line Item',
            'sort': 11,
            'displayLevel': 4,
            'category': '11',
            'code': '2022'
        }, {
            'name': 'Public relations and fundraising managers',
            'type': 'Line Item',
            'sort': 12,
            'displayLevel': 3,
            'category': '11',
            'code': '2030'
        }, {
            'name': 'Operations specialties managers',
            'type': 'Summary',
            'sort': 13,
            'displayLevel': 2,
            'category': '11',
            'code': '3000'
        }, {
            'name': 'Administrative services and facilities managers',
            'type': 'Line Item',
            'sort': 14,
            'displayLevel': 3,
            'category': '11',
            'code': '3010'
        }, {
            'name': 'Computer and information systems managers',
            'type': 'Line Item',
            'sort': 15,
            'displayLevel': 3,
            'category': '11',
            'code': '3021'
        }, {
            'name': 'Financial managers',
            'type': 'Line Item',
            'sort': 16,
            'displayLevel': 3,
            'category': '11',
            'code': '3031'
        }, {
            'name': 'Industrial production managers',
            'type': 'Line Item',
            'sort': 17,
            'displayLevel': 3,
            'category': '11',
            'code': '3051'
        }, {
            'name': 'Purchasing managers',
            'type': 'Line Item',
            'sort': 18,
            'displayLevel': 3,
            'category': '11',
            'code': '3061'
        }, {
            'name': 'Transportation, storage, and distribution managers',
            'type': 'Line Item',
            'sort': 19,
            'displayLevel': 3,
            'category': '11',
            'code': '3071'
        }, {
            'name': 'Compensation and benefits managers',
            'type': 'Line Item',
            'sort': 20,
            'displayLevel': 3,
            'category': '11',
            'code': '3111'
        }, {
            'name': 'Human resources managers',
            'type': 'Line Item',
            'sort': 21,
            'displayLevel': 3,
            'category': '11',
            'code': '3121'
        }, {
            'name': 'Training and development managers',
            'type': 'Line Item',
            'sort': 22,
            'displayLevel': 3,
            'category': '11',
            'code': '3131'
        }, {
            'name': 'Other management occupations',
            'type': 'Summary',
            'sort': 23,
            'displayLevel': 2,
            'category': '11',
            'code': '9000'
        }, {
            'name': 'Farmers, ranchers, and other agricultural managers',
            'type': 'Line Item',
            'sort': 24,
            'displayLevel': 3,
            'category': '11',
            'code': '9013'
        }, {
            'name': 'Construction managers',
            'type': 'Line Item',
            'sort': 25,
            'displayLevel': 3,
            'category': '11',
            'code': '9021'
        }, {
            'name': 'Education and childcare administrators',
            'type': 'Summary',
            'sort': 26,
            'displayLevel': 3,
            'category': '11',
            'code': '9030'
        }, {
            'name': 'Education and childcare administrators, preschool and daycare',
            'type': 'Line Item',
            'sort': 27,
            'displayLevel': 4,
            'category': '11',
            'code': '9031'
        }, {
            'name': 'Education administrators, kindergarten through secondary',
            'type': 'Line Item',
            'sort': 28,
            'displayLevel': 4,
            'category': '11',
            'code': '9032'
        }, {
            'name': 'Education administrators, postsecondary',
            'type': 'Line Item',
            'sort': 29,
            'displayLevel': 4,
            'category': '11',
            'code': '9033'
        }, {
            'name': 'Education administrators, all other',
            'type': 'Line Item',
            'sort': 30,
            'displayLevel': 4,
            'category': '11',
            'code': '9039'
        }, {
            'name': 'Architectural and engineering managers',
            'type': 'Line Item',
            'sort': 31,
            'displayLevel': 3,
            'category': '11',
            'code': '9041'
        }, {
            'name': 'Food service managers',
            'type': 'Line Item',
            'sort': 32,
            'displayLevel': 3,
            'category': '11',
            'code': '9051'
        }, {
            'name': 'Gambling managers',
            'type': 'Line Item',
            'sort': 33,
            'displayLevel': 3,
            'category': '11',
            'code': '9071'
        }, {
            'name': 'Lodging managers',
            'type': 'Line Item',
            'sort': 34,
            'displayLevel': 3,
            'category': '11',
            'code': '9081'
        }, {
            'name': 'Medical and health services managers',
            'type': 'Line Item',
            'sort': 35,
            'displayLevel': 3,
            'category': '11',
            'code': '9111'
        }, {
            'name': 'Natural sciences managers',
            'type': 'Line Item',
            'sort': 36,
            'displayLevel': 3,
            'category': '11',
            'code': '9121'
        }, {
            'name': 'Postmasters and mail superintendents',
            'type': 'Line Item',
            'sort': 37,
            'displayLevel': 3,
            'category': '11',
            'code': '9131'
        }, {
            'name': 'Property, real estate, and community association managers',
            'type': 'Line Item',
            'sort': 38,
            'displayLevel': 3,
            'category': '11',
            'code': '9141'
        }, {
            'name': 'Social and community service managers',
            'type': 'Line Item',
            'sort': 39,
            'displayLevel': 3,
            'category': '11',
            'code': '9151'
        }, {
            'name': 'Emergency management directors',
            'type': 'Line Item',
            'sort': 40,
            'displayLevel': 3,
            'category': '11',
            'code': '9161'
        }, {
            'name': 'Funeral home managers',
            'type': 'Line Item',
            'sort': 41,
            'displayLevel': 3,
            'category': '11',
            'code': '9171'
        }, {
            'name': 'Personal service managers, all other; entertainment and recreation managers, except gambling; and managers, all other',
            'type': 'Line Item',
            'sort': 42,
            'displayLevel': 3,
            'category': '11',
            'code': '9198'
        }]
    }, {
        'name': 'Business and financial operations occupations',
        'type': 'Summary',
        'sort': 43,
        'displayLevel': 1,
        'code': '13',
        'children': [{
            'name': 'Business operations specialists',
            'type': 'Summary',
            'sort': 44,
            'displayLevel': 2,
            'category': '13',
            'code': '1000'
        }, {
            'name': 'Agents and business managers of artists, performers, and athletes',
            'type': 'Line Item',
            'sort': 45,
            'displayLevel': 3,
            'category': '13',
            'code': '1011'
        }, {
            'name': 'Buyers and purchasing agents',
            'type': 'Line Item',
            'sort': 46,
            'displayLevel': 3,
            'category': '13',
            'code': '1020'
        }, {
            'name': 'Claims adjusters, appraisers, examiners, and investigators',
            'type': 'Summary',
            'sort': 47,
            'displayLevel': 3,
            'category': '13',
            'code': '1030'
        }, {
            'name': 'Claims adjusters, examiners, and investigators',
            'type': 'Line Item',
            'sort': 48,
            'displayLevel': 4,
            'category': '13',
            'code': '1031'
        }, {
            'name': 'Insurance appraisers, auto damage',
            'type': 'Line Item',
            'sort': 49,
            'displayLevel': 4,
            'category': '13',
            'code': '1032'
        }, {
            'name': 'Compliance officers',
            'type': 'Line Item',
            'sort': 50,
            'displayLevel': 3,
            'category': '13',
            'code': '1041'
        }, {
            'name': 'Cost estimators',
            'type': 'Line Item',
            'sort': 51,
            'displayLevel': 3,
            'category': '13',
            'code': '1051'
        }, {
            'name': 'Human resources workers',
            'type': 'Summary',
            'sort': 52,
            'displayLevel': 3,
            'category': '13',
            'code': '1070'
        }, {
            'name': 'Human resources specialists',
            'type': 'Line Item',
            'sort': 53,
            'displayLevel': 4,
            'category': '13',
            'code': '1071'
        }, {
            'name': 'Farm labor contractors',
            'type': 'Line Item',
            'sort': 54,
            'displayLevel': 4,
            'category': '13',
            'code': '1074'
        }, {
            'name': 'Labor relations specialists',
            'type': 'Line Item',
            'sort': 55,
            'displayLevel': 4,
            'category': '13',
            'code': '1075'
        }, {
            'name': 'Logisticians',
            'type': 'Line Item',
            'sort': 56,
            'displayLevel': 3,
            'category': '13',
            'code': '1081'
        }, {
            'name': 'Management analysts',
            'type': 'Line Item',
            'sort': 57,
            'displayLevel': 3,
            'category': '13',
            'code': '1111'
        }, {
            'name': 'Meeting, convention, and event planners',
            'type': 'Line Item',
            'sort': 58,
            'displayLevel': 3,
            'category': '13',
            'code': '1121'
        }, {
            'name': 'Fundraisers',
            'type': 'Line Item',
            'sort': 59,
            'displayLevel': 3,
            'category': '13',
            'code': '1131'
        }, {
            'name': 'Compensation, benefits, and job analysis specialists',
            'type': 'Line Item',
            'sort': 60,
            'displayLevel': 3,
            'category': '13',
            'code': '1141'
        }, {
            'name': 'Training and development specialists',
            'type': 'Line Item',
            'sort': 61,
            'displayLevel': 3,
            'category': '13',
            'code': '1151'
        }, {
            'name': 'Market research analysts and marketing specialists',
            'type': 'Line Item',
            'sort': 62,
            'displayLevel': 3,
            'category': '13',
            'code': '1161'
        }, {
            'name': 'Project management specialists and business operations specialists, all other',
            'type': 'Line Item',
            'sort': 63,
            'displayLevel': 3,
            'category': '13',
            'code': '1198'
        }, {
            'name': 'Financial specialists',
            'type': 'Summary',
            'sort': 64,
            'displayLevel': 2,
            'category': '13',
            'code': '2000'
        }, {
            'name': 'Accountants and auditors',
            'type': 'Line Item',
            'sort': 65,
            'displayLevel': 3,
            'category': '13',
            'code': '2011'
        }, {
            'name': 'Property appraisers and assessors',
            'type': 'Line Item',
            'sort': 66,
            'displayLevel': 3,
            'category': '13',
            'code': '2020'
        }, {
            'name': 'Budget analysts',
            'type': 'Line Item',
            'sort': 67,
            'displayLevel': 3,
            'category': '13',
            'code': '2031'
        }, {
            'name': 'Credit analysts',
            'type': 'Line Item',
            'sort': 68,
            'displayLevel': 3,
            'category': '13',
            'code': '2041'
        }, {
            'name': 'Personal financial advisors',
            'type': 'Line Item',
            'sort': 69,
            'displayLevel': 3,
            'category': '13',
            'code': '2052'
        }, {
            'name': 'Insurance underwriters',
            'type': 'Line Item',
            'sort': 70,
            'displayLevel': 3,
            'category': '13',
            'code': '2053'
        }, {
            'name': 'Financial examiners',
            'type': 'Line Item',
            'sort': 71,
            'displayLevel': 3,
            'category': '13',
            'code': '2061'
        }, {
            'name': 'Credit counselors and loan officers',
            'type': 'Summary',
            'sort': 72,
            'displayLevel': 3,
            'category': '13',
            'code': '2070'
        }, {
            'name': 'Credit counselors',
            'type': 'Line Item',
            'sort': 73,
            'displayLevel': 4,
            'category': '13',
            'code': '2071'
        }, {
            'name': 'Loan officers',
            'type': 'Line Item',
            'sort': 74,
            'displayLevel': 4,
            'category': '13',
            'code': '2072'
        }, {
            'name': 'Tax examiners, collectors and preparers, and revenue agents',
            'type': 'Summary',
            'sort': 75,
            'displayLevel': 3,
            'category': '13',
            'code': '2080'
        }, {
            'name': 'Tax examiners and collectors, and revenue agents',
            'type': 'Line Item',
            'sort': 76,
            'displayLevel': 4,
            'category': '13',
            'code': '2081'
        }, {
            'name': 'Tax preparers',
            'type': 'Line Item',
            'sort': 77,
            'displayLevel': 4,
            'category': '13',
            'code': '2082'
        }, {
            'name': 'Financial and investment analysts, financial risk specialists, and financial specialists, all other',
            'type': 'Line Item',
            'sort': 78,
            'displayLevel': 3,
            'category': '13',
            'code': '2098'
        }]
    }, {
        'name': 'Computer and mathematical occupations',
        'type': 'Summary',
        'sort': 79,
        'displayLevel': 1,
        'code': '15',
        'children': [{
            'name': 'Computer occupations',
            'type': 'Summary',
            'sort': 80,
            'displayLevel': 2,
            'category': '15',
            'code': '1200'
        }, {
            'name': 'Computer and information analysts',
            'type': 'Summary',
            'sort': 81,
            'displayLevel': 3,
            'category': '15',
            'code': '1210'
        }, {
            'name': 'Computer systems analysts',
            'type': 'Line Item',
            'sort': 82,
            'displayLevel': 4,
            'category': '15',
            'code': '1211'
        }, {
            'name': 'Information security analysts',
            'type': 'Line Item',
            'sort': 83,
            'displayLevel': 4,
            'category': '15',
            'code': '1212'
        }, {
            'name': 'Computer and information research scientists',
            'type': 'Line Item',
            'sort': 84,
            'displayLevel': 3,
            'category': '15',
            'code': '1221'
        }, {
            'name': 'Computer support specialists',
            'type': 'Summary',
            'sort': 85,
            'displayLevel': 3,
            'category': '15',
            'code': '1230'
        }, {
            'name': 'Computer network support specialists',
            'type': 'Line Item',
            'sort': 86,
            'displayLevel': 4,
            'category': '15',
            'code': '1231'
        }, {
            'name': 'Computer user support specialists',
            'type': 'Line Item',
            'sort': 87,
            'displayLevel': 4,
            'category': '15',
            'code': '1232'
        }, {
            'name': 'Database and network administrators and architects',
            'type': 'Summary',
            'sort': 88,
            'displayLevel': 3,
            'category': '15',
            'code': '1240'
        }, {
            'name': 'Computer network architects',
            'type': 'Line Item',
            'sort': 89,
            'displayLevel': 4,
            'category': '15',
            'code': '1241'
        }, {
            'name': 'Network and computer systems administrators',
            'type': 'Line Item',
            'sort': 90,
            'displayLevel': 4,
            'category': '15',
            'code': '1244'
        }, {
            'name': 'Database administrators and architects',
            'type': 'Line Item',
            'sort': 91,
            'displayLevel': 4,
            'category': '15',
            'code': '1245'
        }, {
            'name': 'Software and web developers, programmers, and testers',
            'type': 'Summary',
            'sort': 92,
            'displayLevel': 3,
            'category': '15',
            'code': '1250'
        }, {
            'name': 'Computer programmers',
            'type': 'Line Item',
            'sort': 93,
            'displayLevel': 4,
            'category': '15',
            'code': '1251'
        }, {
            'name': 'Software developers and software quality assurance analysts and testers',
            'type': 'Line Item',
            'sort': 94,
            'displayLevel': 4,
            'category': '15',
            'code': '1256'
        }, {
            'name': 'Web developers and digital interface designers',
            'type': 'Line Item',
            'sort': 95,
            'displayLevel': 4,
            'category': '15',
            'code': '1257'
        }, {
            'name': 'Computer occupations, all other',
            'type': 'Line Item',
            'sort': 96,
            'displayLevel': 3,
            'category': '15',
            'code': '1299'
        }, {
            'name': 'Mathematical science occupations',
            'type': 'Summary',
            'sort': 97,
            'displayLevel': 2,
            'category': '15',
            'code': '2000'
        }, {
            'name': 'Actuaries',
            'type': 'Line Item',
            'sort': 98,
            'displayLevel': 3,
            'category': '15',
            'code': '2011'
        }, {
            'name': 'Mathematicians',
            'type': 'Line Item',
            'sort': 99,
            'displayLevel': 3,
            'category': '15',
            'code': '2021'
        }, {
            'name': 'Operations research analysts',
            'type': 'Line Item',
            'sort': 100,
            'displayLevel': 3,
            'category': '15',
            'code': '2031'
        }, {
            'name': 'Statisticians',
            'type': 'Line Item',
            'sort': 101,
            'displayLevel': 3,
            'category': '15',
            'code': '2041'
        }, {
            'name': 'Data scientists and mathematical science occupations, all other',
            'type': 'Line Item',
            'sort': 102,
            'displayLevel': 3,
            'category': '15',
            'code': '2098'
        }]
    }, {
        'name': 'Architecture and engineering occupations',
        'type': 'Summary',
        'sort': 103,
        'displayLevel': 1,
        'code': '17',
        'children': [{
            'name': 'Architects, surveyors, and cartographers',
            'type': 'Summary',
            'sort': 104,
            'displayLevel': 2,
            'category': '17',
            'code': '1000'
        }, {
            'name': 'Architects, except naval',
            'type': 'Summary',
            'sort': 105,
            'displayLevel': 3,
            'category': '17',
            'code': '1010'
        }, {
            'name': 'Architects, except landscape and naval',
            'type': 'Line Item',
            'sort': 106,
            'displayLevel': 4,
            'category': '17',
            'code': '1011'
        }, {
            'name': 'Landscape architects',
            'type': 'Line Item',
            'sort': 107,
            'displayLevel': 4,
            'category': '17',
            'code': '1012'
        }, {
            'name': 'Surveyors, cartographers, and photogrammetrists',
            'type': 'Summary',
            'sort': 108,
            'displayLevel': 3,
            'category': '17',
            'code': '1020'
        }, {
            'name': 'Cartographers and photogrammetrists',
            'type': 'Line Item',
            'sort': 109,
            'displayLevel': 4,
            'category': '17',
            'code': '1021'
        }, {
            'name': 'Surveyors',
            'type': 'Line Item',
            'sort': 110,
            'displayLevel': 4,
            'category': '17',
            'code': '1022'
        }, {
            'name': 'Engineers',
            'type': 'Summary',
            'sort': 111,
            'displayLevel': 2,
            'category': '17',
            'code': '2000'
        }, {
            'name': 'Aerospace engineers',
            'type': 'Line Item',
            'sort': 112,
            'displayLevel': 3,
            'category': '17',
            'code': '2011'
        }, {
            'name': 'Agricultural engineers',
            'type': 'Line Item',
            'sort': 113,
            'displayLevel': 3,
            'category': '17',
            'code': '2021'
        }, {
            'name': 'Bioengineers and biomedical engineers',
            'type': 'Line Item',
            'sort': 114,
            'displayLevel': 3,
            'category': '17',
            'code': '2031'
        }, {
            'name': 'Chemical engineers',
            'type': 'Line Item',
            'sort': 115,
            'displayLevel': 3,
            'category': '17',
            'code': '2041'
        }, {
            'name': 'Civil engineers',
            'type': 'Line Item',
            'sort': 116,
            'displayLevel': 3,
            'category': '17',
            'code': '2051'
        }, {
            'name': 'Computer hardware engineers',
            'type': 'Line Item',
            'sort': 117,
            'displayLevel': 3,
            'category': '17',
            'code': '2061'
        }, {
            'name': 'Electrical and electronics engineers',
            'type': 'Summary',
            'sort': 118,
            'displayLevel': 3,
            'category': '17',
            'code': '2070'
        }, {
            'name': 'Electrical engineers',
            'type': 'Line Item',
            'sort': 119,
            'displayLevel': 4,
            'category': '17',
            'code': '2071'
        }, {
            'name': 'Electronics engineers, except computer',
            'type': 'Line Item',
            'sort': 120,
            'displayLevel': 4,
            'category': '17',
            'code': '2072'
        }, {
            'name': 'Environmental engineers',
            'type': 'Line Item',
            'sort': 121,
            'displayLevel': 3,
            'category': '17',
            'code': '2081'
        }, {
            'name': 'Industrial engineers, including health and safety',
            'type': 'Summary',
            'sort': 122,
            'displayLevel': 3,
            'category': '17',
            'code': '2110'
        }, {
            'name': 'Health and safety engineers, except mining safety engineers and inspectors',
            'type': 'Line Item',
            'sort': 123,
            'displayLevel': 4,
            'category': '17',
            'code': '2111'
        }, {
            'name': 'Industrial engineers',
            'type': 'Line Item',
            'sort': 124,
            'displayLevel': 4,
            'category': '17',
            'code': '2112'
        }, {
            'name': 'Marine engineers and naval architects',
            'type': 'Line Item',
            'sort': 125,
            'displayLevel': 3,
            'category': '17',
            'code': '2121'
        }, {
            'name': 'Materials engineers',
            'type': 'Line Item',
            'sort': 126,
            'displayLevel': 3,
            'category': '17',
            'code': '2131'
        }, {
            'name': 'Mechanical engineers',
            'type': 'Line Item',
            'sort': 127,
            'displayLevel': 3,
            'category': '17',
            'code': '2141'
        }, {
            'name': 'Mining and geological engineers, including mining safety engineers',
            'type': 'Line Item',
            'sort': 128,
            'displayLevel': 3,
            'category': '17',
            'code': '2151'
        }, {
            'name': 'Nuclear engineers',
            'type': 'Line Item',
            'sort': 129,
            'displayLevel': 3,
            'category': '17',
            'code': '2161'
        }, {
            'name': 'Petroleum engineers',
            'type': 'Line Item',
            'sort': 130,
            'displayLevel': 3,
            'category': '17',
            'code': '2171'
        }, {
            'name': 'Engineers, all other',
            'type': 'Line Item',
            'sort': 131,
            'displayLevel': 3,
            'category': '17',
            'code': '2199'
        }, {
            'name': 'Drafters, engineering technicians, and mapping technicians',
            'type': 'Summary',
            'sort': 132,
            'displayLevel': 2,
            'category': '17',
            'code': '3000'
        }, {
            'name': 'Drafters',
            'type': 'Summary',
            'sort': 133,
            'displayLevel': 3,
            'category': '17',
            'code': '3010'
        }, {
            'name': 'Architectural and civil drafters',
            'type': 'Line Item',
            'sort': 134,
            'displayLevel': 4,
            'category': '17',
            'code': '3011'
        }, {
            'name': 'Electrical and electronics drafters',
            'type': 'Line Item',
            'sort': 135,
            'displayLevel': 4,
            'category': '17',
            'code': '3012'
        }, {
            'name': 'Mechanical drafters',
            'type': 'Line Item',
            'sort': 136,
            'displayLevel': 4,
            'category': '17',
            'code': '3013'
        }, {
            'name': 'Drafters, all other',
            'type': 'Line Item',
            'sort': 137,
            'displayLevel': 4,
            'category': '17',
            'code': '3019'
        }, {
            'name': 'Engineering technologists and technicians, except drafters',
            'type': 'Summary',
            'sort': 138,
            'displayLevel': 3,
            'category': '17',
            'code': '3020'
        }, {
            'name': 'Aerospace engineering and operations technologists and technicians',
            'type': 'Line Item',
            'sort': 139,
            'displayLevel': 4,
            'category': '17',
            'code': '3021'
        }, {
            'name': 'Civil engineering technologists and technicians',
            'type': 'Line Item',
            'sort': 140,
            'displayLevel': 4,
            'category': '17',
            'code': '3022'
        }, {
            'name': 'Electrical and electronic engineering technologists and technicians',
            'type': 'Line Item',
            'sort': 141,
            'displayLevel': 4,
            'category': '17',
            'code': '3023'
        }, {
            'name': 'Electro-mechanical and mechatronics technologists and technicians',
            'type': 'Line Item',
            'sort': 142,
            'displayLevel': 4,
            'category': '17',
            'code': '3024'
        }, {
            'name': 'Environmental engineering technologists and technicians',
            'type': 'Line Item',
            'sort': 143,
            'displayLevel': 4,
            'category': '17',
            'code': '3025'
        }, {
            'name': 'Industrial engineering technologists and technicians',
            'type': 'Line Item',
            'sort': 144,
            'displayLevel': 4,
            'category': '17',
            'code': '3026'
        }, {
            'name': 'Mechanical engineering technologists and technicians',
            'type': 'Line Item',
            'sort': 145,
            'displayLevel': 4,
            'category': '17',
            'code': '3027'
        }, {
            'name': 'Surveying and mapping technicians',
            'type': 'Line Item',
            'sort': 146,
            'displayLevel': 3,
            'category': '17',
            'code': '3031'
        }, {
            'name': 'Calibration technologists and technicians and engineering technologists and technicians, except drafters, all other',
            'type': 'Line Item',
            'sort': 147,
            'displayLevel': 3,
            'category': '17',
            'code': '3098'
        }]
    }, {
        'name': 'Life, physical, and social science occupations',
        'type': 'Summary',
        'sort': 148,
        'displayLevel': 1,
        'code': '19',
        'children': [{
            'name': 'Life scientists',
            'type': 'Summary',
            'sort': 149,
            'displayLevel': 2,
            'category': '19',
            'code': '1000'
        }, {
            'name': 'Agricultural and food scientists',
            'type': 'Summary',
            'sort': 150,
            'displayLevel': 3,
            'category': '19',
            'code': '1010'
        }, {
            'name': 'Animal scientists',
            'type': 'Line Item',
            'sort': 151,
            'displayLevel': 4,
            'category': '19',
            'code': '1011'
        }, {
            'name': 'Food scientists and technologists',
            'type': 'Line Item',
            'sort': 152,
            'displayLevel': 4,
            'category': '19',
            'code': '1012'
        }, {
            'name': 'Soil and plant scientists',
            'type': 'Line Item',
            'sort': 153,
            'displayLevel': 4,
            'category': '19',
            'code': '1013'
        }, {
            'name': 'Biological scientists',
            'type': 'Summary',
            'sort': 154,
            'displayLevel': 3,
            'category': '19',
            'code': '1020'
        }, {
            'name': 'Biochemists and biophysicists',
            'type': 'Line Item',
            'sort': 155,
            'displayLevel': 4,
            'category': '19',
            'code': '1021'
        }, {
            'name': 'Microbiologists',
            'type': 'Line Item',
            'sort': 156,
            'displayLevel': 4,
            'category': '19',
            'code': '1022'
        }, {
            'name': 'Zoologists and wildlife biologists',
            'type': 'Line Item',
            'sort': 157,
            'displayLevel': 4,
            'category': '19',
            'code': '1023'
        }, {
            'name': 'Biological scientists, all other',
            'type': 'Line Item',
            'sort': 158,
            'displayLevel': 4,
            'category': '19',
            'code': '1029'
        }, {
            'name': 'Conservation scientists and foresters',
            'type': 'Summary',
            'sort': 159,
            'displayLevel': 3,
            'category': '19',
            'code': '1030'
        }, {
            'name': 'Conservation scientists',
            'type': 'Line Item',
            'sort': 160,
            'displayLevel': 4,
            'category': '19',
            'code': '1031'
        }, {
            'name': 'Foresters',
            'type': 'Line Item',
            'sort': 161,
            'displayLevel': 4,
            'category': '19',
            'code': '1032'
        }, {
            'name': 'Medical scientists',
            'type': 'Summary',
            'sort': 162,
            'displayLevel': 3,
            'category': '19',
            'code': '1040'
        }, {
            'name': 'Epidemiologists',
            'type': 'Line Item',
            'sort': 163,
            'displayLevel': 4,
            'category': '19',
            'code': '1041'
        }, {
            'name': 'Medical scientists, except epidemiologists',
            'type': 'Line Item',
            'sort': 164,
            'displayLevel': 4,
            'category': '19',
            'code': '1042'
        }, {
            'name': 'Life scientists, all other',
            'type': 'Line Item',
            'sort': 165,
            'displayLevel': 3,
            'category': '19',
            'code': '1099'
        }, {
            'name': 'Physical scientists',
            'type': 'Summary',
            'sort': 166,
            'displayLevel': 2,
            'category': '19',
            'code': '2000'
        }, {
            'name': 'Astronomers and physicists',
            'type': 'Summary',
            'sort': 167,
            'displayLevel': 3,
            'category': '19',
            'code': '2010'
        }, {
            'name': 'Astronomers',
            'type': 'Line Item',
            'sort': 168,
            'displayLevel': 4,
            'category': '19',
            'code': '2011'
        }, {
            'name': 'Physicists',
            'type': 'Line Item',
            'sort': 169,
            'displayLevel': 4,
            'category': '19',
            'code': '2012'
        }, {
            'name': 'Atmospheric and space scientists',
            'type': 'Line Item',
            'sort': 170,
            'displayLevel': 3,
            'category': '19',
            'code': '2021'
        }, {
            'name': 'Chemists and materials scientists',
            'type': 'Summary',
            'sort': 171,
            'displayLevel': 3,
            'category': '19',
            'code': '2030'
        }, {
            'name': 'Chemists',
            'type': 'Line Item',
            'sort': 172,
            'displayLevel': 4,
            'category': '19',
            'code': '2031'
        }, {
            'name': 'Materials scientists',
            'type': 'Line Item',
            'sort': 173,
            'displayLevel': 4,
            'category': '19',
            'code': '2032'
        }, {
            'name': 'Environmental scientists and geoscientists',
            'type': 'Summary',
            'sort': 174,
            'displayLevel': 3,
            'category': '19',
            'code': '2040'
        }, {
            'name': 'Environmental scientists and specialists, including health',
            'type': 'Line Item',
            'sort': 175,
            'displayLevel': 4,
            'category': '19',
            'code': '2041'
        }, {
            'name': 'Geoscientists, except hydrologists and geographers',
            'type': 'Line Item',
            'sort': 176,
            'displayLevel': 4,
            'category': '19',
            'code': '2042'
        }, {
            'name': 'Hydrologists',
            'type': 'Line Item',
            'sort': 177,
            'displayLevel': 4,
            'category': '19',
            'code': '2043'
        }, {
            'name': 'Physical scientists, all other',
            'type': 'Line Item',
            'sort': 178,
            'displayLevel': 3,
            'category': '19',
            'code': '2099'
        }, {
            'name': 'Social scientists and related workers',
            'type': 'Summary',
            'sort': 179,
            'displayLevel': 2,
            'category': '19',
            'code': '3000'
        }, {
            'name': 'Economists',
            'type': 'Line Item',
            'sort': 180,
            'displayLevel': 3,
            'category': '19',
            'code': '3011'
        }, {
            'name': 'Survey researchers',
            'type': 'Line Item',
            'sort': 181,
            'displayLevel': 3,
            'category': '19',
            'code': '3022'
        }, {
            'name': 'Psychologists',
            'type': 'Summary',
            'sort': 182,
            'displayLevel': 3,
            'category': '19',
            'code': '3030'
        }, {
            'name': 'Clinical, counseling, and school psychologists',
            'type': 'Line Item',
            'sort': 183,
            'displayLevel': 4,
            'category': '19',
            'code': '3031'
        }, {
            'name': 'Industrial-organizational psychologists',
            'type': 'Line Item',
            'sort': 184,
            'displayLevel': 4,
            'category': '19',
            'code': '3032'
        }, {
            'name': 'Psychologists, all other',
            'type': 'Line Item',
            'sort': 185,
            'displayLevel': 4,
            'category': '19',
            'code': '3039'
        }, {
            'name': 'Sociologists',
            'type': 'Line Item',
            'sort': 186,
            'displayLevel': 3,
            'category': '19',
            'code': '3041'
        }, {
            'name': 'Urban and regional planners',
            'type': 'Line Item',
            'sort': 187,
            'displayLevel': 3,
            'category': '19',
            'code': '3051'
        }, {
            'name': 'Miscellaneous social scientists and related workers',
            'type': 'Summary',
            'sort': 188,
            'displayLevel': 3,
            'category': '19',
            'code': '3090'
        }, {
            'name': 'Anthropologists and archeologists',
            'type': 'Line Item',
            'sort': 189,
            'displayLevel': 4,
            'category': '19',
            'code': '3091'
        }, {
            'name': 'Geographers',
            'type': 'Line Item',
            'sort': 190,
            'displayLevel': 4,
            'category': '19',
            'code': '3092'
        }, {
            'name': 'Historians',
            'type': 'Line Item',
            'sort': 191,
            'displayLevel': 4,
            'category': '19',
            'code': '3093'
        }, {
            'name': 'Political scientists',
            'type': 'Line Item',
            'sort': 192,
            'displayLevel': 4,
            'category': '19',
            'code': '3094'
        }, {
            'name': 'Social scientists and related workers, all other',
            'type': 'Line Item',
            'sort': 193,
            'displayLevel': 4,
            'category': '19',
            'code': '3099'
        }, {
            'name': 'Life, physical, and social science technicians',
            'type': 'Summary',
            'sort': 194,
            'displayLevel': 2,
            'category': '19',
            'code': '4000'
        }, {
            'name': 'Agricultural and food science technicians',
            'type': 'Line Item',
            'sort': 195,
            'displayLevel': 3,
            'category': '19',
            'code': '4010'
        }, {
            'name': 'Biological technicians',
            'type': 'Line Item',
            'sort': 196,
            'displayLevel': 3,
            'category': '19',
            'code': '4021'
        }, {
            'name': 'Chemical technicians',
            'type': 'Line Item',
            'sort': 197,
            'displayLevel': 3,
            'category': '19',
            'code': '4031'
        }, {
            'name': 'Environmental science and geoscience technicians',
            'type': 'Summary',
            'sort': 198,
            'displayLevel': 3,
            'category': '19',
            'code': '4040'
        }, {
            'name': 'Environmental science and protection technicians, including health',
            'type': 'Line Item',
            'sort': 199,
            'displayLevel': 4,
            'category': '19',
            'code': '4042'
        }, {
            'name': 'Geological and hydrologic technicians',
            'type': 'Line Item',
            'sort': 200,
            'displayLevel': 4,
            'category': '19',
            'code': '4045'
        }, {
            'name': 'Nuclear technicians',
            'type': 'Line Item',
            'sort': 201,
            'displayLevel': 3,
            'category': '19',
            'code': '4051'
        }, {
            'name': 'Social science research assistants',
            'type': 'Line Item',
            'sort': 202,
            'displayLevel': 3,
            'category': '19',
            'code': '4061'
        }, {
            'name': 'Forest and conservation technicians',
            'type': 'Line Item',
            'sort': 203,
            'displayLevel': 3,
            'category': '19',
            'code': '4071'
        }, {
            'name': 'Miscellaneous life, physical, and social science technicians',
            'type': 'Summary',
            'sort': 204,
            'displayLevel': 3,
            'category': '19',
            'code': '4090'
        }, {
            'name': 'Forensic science technicians',
            'type': 'Line Item',
            'sort': 205,
            'displayLevel': 4,
            'category': '19',
            'code': '4092'
        }, {
            'name': 'Life, physical, and social science technicians, all other',
            'type': 'Line Item',
            'sort': 206,
            'displayLevel': 4,
            'category': '19',
            'code': '4099'
        }, {
            'name': 'Occupational health and safety specialists and technicians',
            'type': 'Summary',
            'sort': 207,
            'displayLevel': 2,
            'category': '19',
            'code': '5000'
        }, {
            'name': 'Occupational health and safety specialists',
            'type': 'Line Item',
            'sort': 208,
            'displayLevel': 3,
            'category': '19',
            'code': '5011'
        }, {
            'name': 'Occupational health and safety technicians',
            'type': 'Line Item',
            'sort': 209,
            'displayLevel': 3,
            'category': '19',
            'code': '5012'
        }]
    }, {
        'name': 'Community and social service occupations',
        'type': 'Summary',
        'sort': 210,
        'displayLevel': 1,
        'code': '21',
        'children': [{
            'name': 'Counselors, social workers, and other community and social service specialists',
            'type': 'Summary',
            'sort': 211,
            'displayLevel': 2,
            'category': '21',
            'code': '1000'
        }, {
            'name': 'Counselors',
            'type': 'Summary',
            'sort': 212,
            'displayLevel': 3,
            'category': '21',
            'code': '1010'
        }, {
            'name': 'Educational, guidance, and career counselors and advisors',
            'type': 'Line Item',
            'sort': 213,
            'displayLevel': 4,
            'category': '21',
            'code': '1012'
        }, {
            'name': 'Marriage and family therapists',
            'type': 'Line Item',
            'sort': 214,
            'displayLevel': 4,
            'category': '21',
            'code': '1013'
        }, {
            'name': 'Rehabilitation counselors',
            'type': 'Line Item',
            'sort': 215,
            'displayLevel': 4,
            'category': '21',
            'code': '1015'
        }, {
            'name': 'Substance abuse, behavioral disorder, and mental health counselors',
            'type': 'Line Item',
            'sort': 216,
            'displayLevel': 4,
            'category': '21',
            'code': '1018'
        }, {
            'name': 'Counselors, all other',
            'type': 'Line Item',
            'sort': 217,
            'displayLevel': 4,
            'category': '21',
            'code': '1019'
        }, {
            'name': 'Social workers',
            'type': 'Summary',
            'sort': 218,
            'displayLevel': 3,
            'category': '21',
            'code': '1020'
        }, {
            'name': 'Child, family, and school social workers',
            'type': 'Line Item',
            'sort': 219,
            'displayLevel': 4,
            'category': '21',
            'code': '1021'
        }, {
            'name': 'Healthcare social workers',
            'type': 'Line Item',
            'sort': 220,
            'displayLevel': 4,
            'category': '21',
            'code': '1022'
        }, {
            'name': 'Mental health and substance abuse social workers',
            'type': 'Line Item',
            'sort': 221,
            'displayLevel': 4,
            'category': '21',
            'code': '1023'
        }, {
            'name': 'Social workers, all other',
            'type': 'Line Item',
            'sort': 222,
            'displayLevel': 4,
            'category': '21',
            'code': '1029'
        }, {
            'name': 'Miscellaneous community and social service specialists',
            'type': 'Summary',
            'sort': 223,
            'displayLevel': 3,
            'category': '21',
            'code': '1090'
        }, {
            'name': 'Health education specialists',
            'type': 'Line Item',
            'sort': 224,
            'displayLevel': 4,
            'category': '21',
            'code': '1091'
        }, {
            'name': 'Probation officers and correctional treatment specialists',
            'type': 'Line Item',
            'sort': 225,
            'displayLevel': 4,
            'category': '21',
            'code': '1092'
        }, {
            'name': 'Social and human service assistants',
            'type': 'Line Item',
            'sort': 226,
            'displayLevel': 4,
            'category': '21',
            'code': '1093'
        }, {
            'name': 'Community health workers',
            'type': 'Line Item',
            'sort': 227,
            'displayLevel': 4,
            'category': '21',
            'code': '1094'
        }, {
            'name': 'Community and social service specialists, all other',
            'type': 'Line Item',
            'sort': 228,
            'displayLevel': 4,
            'category': '21',
            'code': '1099'
        }, {
            'name': 'Religious workers',
            'type': 'Summary',
            'sort': 229,
            'displayLevel': 2,
            'category': '21',
            'code': '2000'
        }, {
            'name': 'Clergy',
            'type': 'Line Item',
            'sort': 230,
            'displayLevel': 3,
            'category': '21',
            'code': '2011'
        }, {
            'name': 'Directors, religious activities and education',
            'type': 'Line Item',
            'sort': 231,
            'displayLevel': 3,
            'category': '21',
            'code': '2021'
        }, {
            'name': 'Religious workers, all other',
            'type': 'Line Item',
            'sort': 232,
            'displayLevel': 3,
            'category': '21',
            'code': '2099'
        }]
    }, {
        'name': 'Legal occupations',
        'type': 'Summary',
        'sort': 233,
        'displayLevel': 1,
        'code': '23',
        'children': [{
            'name': 'Lawyers, judges, and related workers',
            'type': 'Summary',
            'sort': 234,
            'displayLevel': 2,
            'category': '23',
            'code': '1000'
        }, {
            'name': 'Lawyers and judicial law clerks',
            'type': 'Summary',
            'sort': 235,
            'displayLevel': 3,
            'category': '23',
            'code': '1010'
        }, {
            'name': 'Lawyers',
            'type': 'Line Item',
            'sort': 236,
            'displayLevel': 4,
            'category': '23',
            'code': '1011'
        }, {
            'name': 'Judicial law clerks',
            'type': 'Line Item',
            'sort': 237,
            'displayLevel': 4,
            'category': '23',
            'code': '1012'
        }, {
            'name': 'Judges, magistrates, and other judicial workers',
            'type': 'Summary',
            'sort': 238,
            'displayLevel': 3,
            'category': '23',
            'code': '1020'
        }, {
            'name': 'Administrative law judges, adjudicators, and hearing officers',
            'type': 'Line Item',
            'sort': 239,
            'displayLevel': 4,
            'category': '23',
            'code': '1021'
        }, {
            'name': 'Arbitrators, mediators, and conciliators',
            'type': 'Line Item',
            'sort': 240,
            'displayLevel': 4,
            'category': '23',
            'code': '1022'
        }, {
            'name': 'Judges, magistrate judges, and magistrates',
            'type': 'Line Item',
            'sort': 241,
            'displayLevel': 4,
            'category': '23',
            'code': '1023'
        }, {
            'name': 'Legal support workers',
            'type': 'Summary',
            'sort': 242,
            'displayLevel': 2,
            'category': '23',
            'code': '2000'
        }, {
            'name': 'Paralegals and legal assistants',
            'type': 'Line Item',
            'sort': 243,
            'displayLevel': 3,
            'category': '23',
            'code': '2011'
        }, {
            'name': 'Miscellaneous legal support workers',
            'type': 'Summary',
            'sort': 244,
            'displayLevel': 3,
            'category': '23',
            'code': '2090'
        }, {
            'name': 'Title examiners, abstractors, and searchers',
            'type': 'Line Item',
            'sort': 245,
            'displayLevel': 4,
            'category': '23',
            'code': '2093'
        }, {
            'name': 'Legal support workers, all other',
            'type': 'Line Item',
            'sort': 246,
            'displayLevel': 4,
            'category': '23',
            'code': '2099'
        }]
    }, {
        'name': 'Educational instruction and library occupations',
        'type': 'Summary',
        'sort': 247,
        'displayLevel': 1,
        'code': '25',
        'children': [{
            'name': 'Postsecondary teachers',
            'type': 'Summary',
            'sort': 248,
            'displayLevel': 2,
            'category': '25',
            'code': '1000'
        }, {
            'name': 'Business teachers, postsecondary',
            'type': 'Line Item',
            'sort': 249,
            'displayLevel': 3,
            'category': '25',
            'code': '1011'
        }, {
            'name': 'Math and computer science teachers, postsecondary',
            'type': 'Summary',
            'sort': 250,
            'displayLevel': 3,
            'category': '25',
            'code': '1020'
        }, {
            'name': 'Computer science teachers, postsecondary',
            'type': 'Line Item',
            'sort': 251,
            'displayLevel': 4,
            'category': '25',
            'code': '1021'
        }, {
            'name': 'Mathematical science teachers, postsecondary',
            'type': 'Line Item',
            'sort': 252,
            'displayLevel': 4,
            'category': '25',
            'code': '1022'
        }, {
            'name': 'Engineering and architecture teachers, postsecondary',
            'type': 'Summary',
            'sort': 253,
            'displayLevel': 3,
            'category': '25',
            'code': '1030'
        }, {
            'name': 'Architecture teachers, postsecondary',
            'type': 'Line Item',
            'sort': 254,
            'displayLevel': 4,
            'category': '25',
            'code': '1031'
        }, {
            'name': 'Engineering teachers, postsecondary',
            'type': 'Line Item',
            'sort': 255,
            'displayLevel': 4,
            'category': '25',
            'code': '1032'
        }, {
            'name': 'Life sciences teachers, postsecondary',
            'type': 'Summary',
            'sort': 256,
            'displayLevel': 3,
            'category': '25',
            'code': '1040'
        }, {
            'name': 'Agricultural sciences teachers, postsecondary',
            'type': 'Line Item',
            'sort': 257,
            'displayLevel': 4,
            'category': '25',
            'code': '1041'
        }, {
            'name': 'Biological science teachers, postsecondary',
            'type': 'Line Item',
            'sort': 258,
            'displayLevel': 4,
            'category': '25',
            'code': '1042'
        }, {
            'name': 'Forestry and conservation science teachers, postsecondary',
            'type': 'Line Item',
            'sort': 259,
            'displayLevel': 4,
            'category': '25',
            'code': '1043'
        }, {
            'name': 'Physical sciences teachers, postsecondary',
            'type': 'Summary',
            'sort': 260,
            'displayLevel': 3,
            'category': '25',
            'code': '1050'
        }, {
            'name': 'Atmospheric, earth, marine, and space sciences teachers, postsecondary',
            'type': 'Line Item',
            'sort': 261,
            'displayLevel': 4,
            'category': '25',
            'code': '1051'
        }, {
            'name': 'Chemistry teachers, postsecondary',
            'type': 'Line Item',
            'sort': 262,
            'displayLevel': 4,
            'category': '25',
            'code': '1052'
        }, {
            'name': 'Environmental science teachers, postsecondary',
            'type': 'Line Item',
            'sort': 263,
            'displayLevel': 4,
            'category': '25',
            'code': '1053'
        }, {
            'name': 'Physics teachers, postsecondary',
            'type': 'Line Item',
            'sort': 264,
            'displayLevel': 4,
            'category': '25',
            'code': '1054'
        }, {
            'name': 'Social sciences teachers, postsecondary',
            'type': 'Summary',
            'sort': 265,
            'displayLevel': 3,
            'category': '25',
            'code': '1060'
        }, {
            'name': 'Anthropology and archeology teachers, postsecondary',
            'type': 'Line Item',
            'sort': 266,
            'displayLevel': 4,
            'category': '25',
            'code': '1061'
        }, {
            'name': 'Area, ethnic, and cultural studies teachers, postsecondary',
            'type': 'Line Item',
            'sort': 267,
            'displayLevel': 4,
            'category': '25',
            'code': '1062'
        }, {
            'name': 'Economics teachers, postsecondary',
            'type': 'Line Item',
            'sort': 268,
            'displayLevel': 4,
            'category': '25',
            'code': '1063'
        }, {
            'name': 'Geography teachers, postsecondary',
            'type': 'Line Item',
            'sort': 269,
            'displayLevel': 4,
            'category': '25',
            'code': '1064'
        }, {
            'name': 'Political science teachers, postsecondary',
            'type': 'Line Item',
            'sort': 270,
            'displayLevel': 4,
            'category': '25',
            'code': '1065'
        }, {
            'name': 'Psychology teachers, postsecondary',
            'type': 'Line Item',
            'sort': 271,
            'displayLevel': 4,
            'category': '25',
            'code': '1066'
        }, {
            'name': 'Sociology teachers, postsecondary',
            'type': 'Line Item',
            'sort': 272,
            'displayLevel': 4,
            'category': '25',
            'code': '1067'
        }, {
            'name': 'Social sciences teachers, postsecondary, all other',
            'type': 'Line Item',
            'sort': 273,
            'displayLevel': 4,
            'category': '25',
            'code': '1069'
        }, {
            'name': 'Health teachers, postsecondary',
            'type': 'Summary',
            'sort': 274,
            'displayLevel': 3,
            'category': '25',
            'code': '1070'
        }, {
            'name': 'Health specialties teachers, postsecondary',
            'type': 'Line Item',
            'sort': 275,
            'displayLevel': 4,
            'category': '25',
            'code': '1071'
        }, {
            'name': 'Nursing instructors and teachers, postsecondary',
            'type': 'Line Item',
            'sort': 276,
            'displayLevel': 4,
            'category': '25',
            'code': '1072'
        }, {
            'name': 'Education and library science teachers, postsecondary',
            'type': 'Summary',
            'sort': 277,
            'displayLevel': 3,
            'category': '25',
            'code': '1080'
        }, {
            'name': 'Education teachers, postsecondary',
            'type': 'Line Item',
            'sort': 278,
            'displayLevel': 4,
            'category': '25',
            'code': '1081'
        }, {
            'name': 'Library science teachers, postsecondary',
            'type': 'Line Item',
            'sort': 279,
            'displayLevel': 4,
            'category': '25',
            'code': '1082'
        }, {
            'name': 'Law, criminal justice, and social work teachers, postsecondary',
            'type': 'Summary',
            'sort': 280,
            'displayLevel': 3,
            'category': '25',
            'code': '1110'
        }, {
            'name': 'Criminal justice and law enforcement teachers, postsecondary',
            'type': 'Line Item',
            'sort': 281,
            'displayLevel': 4,
            'category': '25',
            'code': '1111'
        }, {
            'name': 'Law teachers, postsecondary',
            'type': 'Line Item',
            'sort': 282,
            'displayLevel': 4,
            'category': '25',
            'code': '1112'
        }, {
            'name': 'Social work teachers, postsecondary',
            'type': 'Line Item',
            'sort': 283,
            'displayLevel': 4,
            'category': '25',
            'code': '1113'
        }, {
            'name': 'Arts, communications, history, and humanities teachers, postsecondary',
            'type': 'Summary',
            'sort': 284,
            'displayLevel': 3,
            'category': '25',
            'code': '1120'
        }, {
            'name': 'Art, drama, and music teachers, postsecondary',
            'type': 'Line Item',
            'sort': 285,
            'displayLevel': 4,
            'category': '25',
            'code': '1121'
        }, {
            'name': 'Communications teachers, postsecondary',
            'type': 'Line Item',
            'sort': 286,
            'displayLevel': 4,
            'category': '25',
            'code': '1122'
        }, {
            'name': 'English language and literature teachers, postsecondary',
            'type': 'Line Item',
            'sort': 287,
            'displayLevel': 4,
            'category': '25',
            'code': '1123'
        }, {
            'name': 'Foreign language and literature teachers, postsecondary',
            'type': 'Line Item',
            'sort': 288,
            'displayLevel': 4,
            'category': '25',
            'code': '1124'
        }, {
            'name': 'History teachers, postsecondary',
            'type': 'Line Item',
            'sort': 289,
            'displayLevel': 4,
            'category': '25',
            'code': '1125'
        }, {
            'name': 'Philosophy and religion teachers, postsecondary',
            'type': 'Line Item',
            'sort': 290,
            'displayLevel': 4,
            'category': '25',
            'code': '1126'
        }, {
            'name': 'Miscellaneous postsecondary teachers',
            'type': 'Summary',
            'sort': 291,
            'displayLevel': 3,
            'category': '25',
            'code': '1190'
        }, {
            'name': 'Family and consumer sciences teachers, postsecondary',
            'type': 'Line Item',
            'sort': 292,
            'displayLevel': 4,
            'category': '25',
            'code': '1192'
        }, {
            'name': 'Recreation and fitness studies teachers, postsecondary',
            'type': 'Line Item',
            'sort': 293,
            'displayLevel': 4,
            'category': '25',
            'code': '1193'
        }, {
            'name': 'Career/technical education teachers, postsecondary',
            'type': 'Line Item',
            'sort': 294,
            'displayLevel': 4,
            'category': '25',
            'code': '1194'
        }, {
            'name': 'Postsecondary teachers, all other',
            'type': 'Line Item',
            'sort': 295,
            'displayLevel': 4,
            'category': '25',
            'code': '1199'
        }, {
            'name': 'Preschool, elementary, middle, secondary, and special education teachers',
            'type': 'Summary',
            'sort': 296,
            'displayLevel': 2,
            'category': '25',
            'code': '2000'
        }, {
            'name': 'Preschool and kindergarten teachers',
            'type': 'Summary',
            'sort': 297,
            'displayLevel': 3,
            'category': '25',
            'code': '2010'
        }, {
            'name': 'Preschool teachers, except special education',
            'type': 'Line Item',
            'sort': 298,
            'displayLevel': 4,
            'category': '25',
            'code': '2011'
        }, {
            'name': 'Kindergarten teachers, except special education',
            'type': 'Line Item',
            'sort': 299,
            'displayLevel': 4,
            'category': '25',
            'code': '2012'
        }, {
            'name': 'Elementary and middle school teachers',
            'type': 'Summary',
            'sort': 300,
            'displayLevel': 3,
            'category': '25',
            'code': '2020'
        }, {
            'name': 'Elementary school teachers, except special education',
            'type': 'Line Item',
            'sort': 301,
            'displayLevel': 4,
            'category': '25',
            'code': '2021'
        }, {
            'name': 'Middle school teachers, except special and career/technical education',
            'type': 'Line Item',
            'sort': 302,
            'displayLevel': 4,
            'category': '25',
            'code': '2022'
        }, {
            'name': 'Career/technical education teachers, middle school',
            'type': 'Line Item',
            'sort': 303,
            'displayLevel': 4,
            'category': '25',
            'code': '2023'
        }, {
            'name': 'Secondary school teachers',
            'type': 'Summary',
            'sort': 304,
            'displayLevel': 3,
            'category': '25',
            'code': '2030'
        }, {
            'name': 'Secondary school teachers, except special and career/technical education',
            'type': 'Line Item',
            'sort': 305,
            'displayLevel': 4,
            'category': '25',
            'code': '2031'
        }, {
            'name': 'Career/technical education teachers, secondary school',
            'type': 'Line Item',
            'sort': 306,
            'displayLevel': 4,
            'category': '25',
            'code': '2032'
        }, {
            'name': 'Special education teachers',
            'type': 'Summary',
            'sort': 307,
            'displayLevel': 3,
            'category': '25',
            'code': '2050'
        }, {
            'name': 'Special education teachers, preschool',
            'type': 'Line Item',
            'sort': 308,
            'displayLevel': 4,
            'category': '25',
            'code': '2051'
        }, {
            'name': 'Special education teachers, kindergarten and elementary school',
            'type': 'Line Item',
            'sort': 309,
            'displayLevel': 4,
            'category': '25',
            'code': '2052'
        }, {
            'name': 'Special education teachers, middle school',
            'type': 'Line Item',
            'sort': 310,
            'displayLevel': 4,
            'category': '25',
            'code': '2057'
        }, {
            'name': 'Special education teachers, secondary school',
            'type': 'Line Item',
            'sort': 311,
            'displayLevel': 4,
            'category': '25',
            'code': '2058'
        }, {
            'name': 'Special education teachers, all other',
            'type': 'Line Item',
            'sort': 312,
            'displayLevel': 4,
            'category': '25',
            'code': '2059'
        }, {
            'name': 'Other teachers and instructors',
            'type': 'Summary',
            'sort': 313,
            'displayLevel': 2,
            'category': '25',
            'code': '3000'
        }, {
            'name': 'Adult basic education, adult secondary education, and English as a Second Language instructors',
            'type': 'Line Item',
            'sort': 314,
            'displayLevel': 3,
            'category': '25',
            'code': '3011'
        }, {
            'name': 'Self-enrichment teachers',
            'type': 'Line Item',
            'sort': 315,
            'displayLevel': 3,
            'category': '25',
            'code': '3021'
        }, {
            'name': 'Substitute teachers, short-term',
            'type': 'Line Item',
            'sort': 316,
            'displayLevel': 3,
            'category': '25',
            'code': '3031'
        }, {
            'name': 'Tutors and teachers and instructors, all other',
            'type': 'Line Item',
            'sort': 317,
            'displayLevel': 3,
            'category': '25',
            'code': '3097'
        }, {
            'name': 'Librarians, curators, and archivists',
            'type': 'Summary',
            'sort': 318,
            'displayLevel': 2,
            'category': '25',
            'code': '4000'
        }, {
            'name': 'Archivists, curators, and museum technicians',
            'type': 'Summary',
            'sort': 319,
            'displayLevel': 3,
            'category': '25',
            'code': '4010'
        }, {
            'name': 'Archivists',
            'type': 'Line Item',
            'sort': 320,
            'displayLevel': 4,
            'category': '25',
            'code': '4011'
        }, {
            'name': 'Curators',
            'type': 'Line Item',
            'sort': 321,
            'displayLevel': 4,
            'category': '25',
            'code': '4012'
        }, {
            'name': 'Museum technicians and conservators',
            'type': 'Line Item',
            'sort': 322,
            'displayLevel': 4,
            'category': '25',
            'code': '4013'
        }, {
            'name': 'Librarians and media collections specialists',
            'type': 'Line Item',
            'sort': 323,
            'displayLevel': 3,
            'category': '25',
            'code': '4022'
        }, {
            'name': 'Library technicians',
            'type': 'Line Item',
            'sort': 324,
            'displayLevel': 3,
            'category': '25',
            'code': '4031'
        }, {
            'name': 'Other educational instruction and library occupations',
            'type': 'Summary',
            'sort': 325,
            'displayLevel': 2,
            'category': '25',
            'code': '9000'
        }, {
            'name': 'Farm and home management educators',
            'type': 'Line Item',
            'sort': 326,
            'displayLevel': 3,
            'category': '25',
            'code': '9021'
        }, {
            'name': 'Instructional coordinators',
            'type': 'Line Item',
            'sort': 327,
            'displayLevel': 3,
            'category': '25',
            'code': '9031'
        }, {
            'name': 'Teaching assistants',
            'type': 'Summary',
            'sort': 328,
            'displayLevel': 3,
            'category': '25',
            'code': '9040'
        }, {
            'name': 'Teaching assistants, postsecondary',
            'type': 'Line Item',
            'sort': 329,
            'displayLevel': 4,
            'category': '25',
            'code': '9044'
        }, {
            'name': 'Teaching assistants, except postsecondary',
            'type': 'Line Item',
            'sort': 330,
            'displayLevel': 4,
            'category': '25',
            'code': '9045'
        }, {
            'name': 'Educational instruction and library workers, all other',
            'type': 'Line Item',
            'sort': 331,
            'displayLevel': 3,
            'category': '25',
            'code': '9099'
        }]
    }, {
        'name': 'Arts, design, entertainment, sports, and media occupations',
        'type': 'Summary',
        'sort': 332,
        'displayLevel': 1,
        'code': '27',
        'children': [{
            'name': 'Art and design workers',
            'type': 'Summary',
            'sort': 333,
            'displayLevel': 2,
            'category': '27',
            'code': '1000'
        }, {
            'name': 'Artists and related workers',
            'type': 'Summary',
            'sort': 334,
            'displayLevel': 3,
            'category': '27',
            'code': '1010'
        }, {
            'name': 'Art directors',
            'type': 'Line Item',
            'sort': 335,
            'displayLevel': 4,
            'category': '27',
            'code': '1011'
        }, {
            'name': 'Craft artists',
            'type': 'Line Item',
            'sort': 336,
            'displayLevel': 4,
            'category': '27',
            'code': '1012'
        }, {
            'name': 'Fine artists, including painters, sculptors, and illustrators',
            'type': 'Line Item',
            'sort': 337,
            'displayLevel': 4,
            'category': '27',
            'code': '1013'
        }, {
            'name': 'Special effects artists and animators',
            'type': 'Line Item',
            'sort': 338,
            'displayLevel': 4,
            'category': '27',
            'code': '1014'
        }, {
            'name': 'Artists and related workers, all other',
            'type': 'Line Item',
            'sort': 339,
            'displayLevel': 4,
            'category': '27',
            'code': '1019'
        }, {
            'name': 'Designers',
            'type': 'Summary',
            'sort': 340,
            'displayLevel': 3,
            'category': '27',
            'code': '1020'
        }, {
            'name': 'Commercial and industrial designers',
            'type': 'Line Item',
            'sort': 341,
            'displayLevel': 4,
            'category': '27',
            'code': '1021'
        }, {
            'name': 'Fashion designers',
            'type': 'Line Item',
            'sort': 342,
            'displayLevel': 4,
            'category': '27',
            'code': '1022'
        }, {
            'name': 'Floral designers',
            'type': 'Line Item',
            'sort': 343,
            'displayLevel': 4,
            'category': '27',
            'code': '1023'
        }, {
            'name': 'Graphic designers',
            'type': 'Line Item',
            'sort': 344,
            'displayLevel': 4,
            'category': '27',
            'code': '1024'
        }, {
            'name': 'Interior designers',
            'type': 'Line Item',
            'sort': 345,
            'displayLevel': 4,
            'category': '27',
            'code': '1025'
        }, {
            'name': 'Merchandise displayers and window trimmers',
            'type': 'Line Item',
            'sort': 346,
            'displayLevel': 4,
            'category': '27',
            'code': '1026'
        }, {
            'name': 'Set and exhibit designers',
            'type': 'Line Item',
            'sort': 347,
            'displayLevel': 4,
            'category': '27',
            'code': '1027'
        }, {
            'name': 'Designers, all other',
            'type': 'Line Item',
            'sort': 348,
            'displayLevel': 4,
            'category': '27',
            'code': '1029'
        }, {
            'name': 'Entertainers and performers, sports and related workers',
            'type': 'Summary',
            'sort': 349,
            'displayLevel': 2,
            'category': '27',
            'code': '2000'
        }, {
            'name': 'Actors, producers, and directors',
            'type': 'Summary',
            'sort': 350,
            'displayLevel': 3,
            'category': '27',
            'code': '2010'
        }, {
            'name': 'Actors',
            'type': 'Line Item',
            'sort': 351,
            'displayLevel': 4,
            'category': '27',
            'code': '2011'
        }, {
            'name': 'Producers and directors',
            'type': 'Line Item',
            'sort': 352,
            'displayLevel': 4,
            'category': '27',
            'code': '2012'
        }, {
            'name': 'Athletes, coaches, umpires, and related workers',
            'type': 'Summary',
            'sort': 353,
            'displayLevel': 3,
            'category': '27',
            'code': '2020'
        }, {
            'name': 'Athletes and sports competitors',
            'type': 'Line Item',
            'sort': 354,
            'displayLevel': 4,
            'category': '27',
            'code': '2021'
        }, {
            'name': 'Coaches and scouts',
            'type': 'Line Item',
            'sort': 355,
            'displayLevel': 4,
            'category': '27',
            'code': '2022'
        }, {
            'name': 'Umpires, referees, and other sports officials',
            'type': 'Line Item',
            'sort': 356,
            'displayLevel': 4,
            'category': '27',
            'code': '2023'
        }, {
            'name': 'Dancers and choreographers',
            'type': 'Summary',
            'sort': 357,
            'displayLevel': 3,
            'category': '27',
            'code': '2030'
        }, {
            'name': 'Dancers',
            'type': 'Line Item',
            'sort': 358,
            'displayLevel': 4,
            'category': '27',
            'code': '2031'
        }, {
            'name': 'Choreographers',
            'type': 'Line Item',
            'sort': 359,
            'displayLevel': 4,
            'category': '27',
            'code': '2032'
        }, {
            'name': 'Musicians, singers, and related workers',
            'type': 'Summary',
            'sort': 360,
            'displayLevel': 3,
            'category': '27',
            'code': '2040'
        }, {
            'name': 'Music directors and composers',
            'type': 'Line Item',
            'sort': 361,
            'displayLevel': 4,
            'category': '27',
            'code': '2041'
        }, {
            'name': 'Musicians and singers',
            'type': 'Line Item',
            'sort': 362,
            'displayLevel': 4,
            'category': '27',
            'code': '2042'
        }, {
            'name': 'Miscellaneous entertainers and performers, sports and related workers',
            'type': 'Line Item',
            'sort': 363,
            'displayLevel': 3,
            'category': '27',
            'code': '2090'
        }, {
            'name': 'Media and communication workers',
            'type': 'Summary',
            'sort': 364,
            'displayLevel': 2,
            'category': '27',
            'code': '3000'
        }, {
            'name': 'Broadcast announcers and radio disc jockeys',
            'type': 'Line Item',
            'sort': 365,
            'displayLevel': 3,
            'category': '27',
            'code': '3011'
        }, {
            'name': 'News analysts, reporters, and journalists',
            'type': 'Line Item',
            'sort': 366,
            'displayLevel': 3,
            'category': '27',
            'code': '3023'
        }, {
            'name': 'Public relations specialists',
            'type': 'Line Item',
            'sort': 367,
            'displayLevel': 3,
            'category': '27',
            'code': '3031'
        }, {
            'name': 'Writers and editors',
            'type': 'Summary',
            'sort': 368,
            'displayLevel': 3,
            'category': '27',
            'code': '3040'
        }, {
            'name': 'Editors',
            'type': 'Line Item',
            'sort': 369,
            'displayLevel': 4,
            'category': '27',
            'code': '3041'
        }, {
            'name': 'Technical writers',
            'type': 'Line Item',
            'sort': 370,
            'displayLevel': 4,
            'category': '27',
            'code': '3042'
        }, {
            'name': 'Writers and authors',
            'type': 'Line Item',
            'sort': 371,
            'displayLevel': 4,
            'category': '27',
            'code': '3043'
        }, {
            'name': 'Miscellaneous media and communication workers',
            'type': 'Summary',
            'sort': 372,
            'displayLevel': 3,
            'category': '27',
            'code': '3090'
        }, {
            'name': 'Interpreters and translators',
            'type': 'Line Item',
            'sort': 373,
            'displayLevel': 4,
            'category': '27',
            'code': '3091'
        }, {
            'name': 'Court reporters and simultaneous captioners',
            'type': 'Line Item',
            'sort': 374,
            'displayLevel': 4,
            'category': '27',
            'code': '3092'
        }, {
            'name': 'Media and communication workers, all other',
            'type': 'Line Item',
            'sort': 375,
            'displayLevel': 4,
            'category': '27',
            'code': '3099'
        }, {
            'name': 'Media and communication equipment workers',
            'type': 'Summary',
            'sort': 376,
            'displayLevel': 2,
            'category': '27',
            'code': '4000'
        }, {
            'name': 'Audio and video technicians',
            'type': 'Line Item',
            'sort': 377,
            'displayLevel': 3,
            'category': '27',
            'code': '4011'
        }, {
            'name': 'Broadcast technicians',
            'type': 'Line Item',
            'sort': 378,
            'displayLevel': 3,
            'category': '27',
            'code': '4012'
        }, {
            'name': 'Sound engineering technicians',
            'type': 'Line Item',
            'sort': 379,
            'displayLevel': 3,
            'category': '27',
            'code': '4014'
        }, {
            'name': 'Photographers',
            'type': 'Line Item',
            'sort': 380,
            'displayLevel': 3,
            'category': '27',
            'code': '4021'
        }, {
            'name': 'Television, video, and film camera operators and editors',
            'type': 'Summary',
            'sort': 381,
            'displayLevel': 3,
            'category': '27',
            'code': '4030'
        }, {
            'name': 'Camera operators, television, video, and film',
            'type': 'Line Item',
            'sort': 382,
            'displayLevel': 4,
            'category': '27',
            'code': '4031'
        }, {
            'name': 'Film and video editors',
            'type': 'Line Item',
            'sort': 383,
            'displayLevel': 4,
            'category': '27',
            'code': '4032'
        }, {
            'name': 'Lighting technicians and media and communication equipment workers, all other',
            'type': 'Line Item',
            'sort': 384,
            'displayLevel': 3,
            'category': '27',
            'code': '4098'
        }]
    }, {
        'name': 'Healthcare practitioners and technical occupations',
        'type': 'Summary',
        'sort': 385,
        'displayLevel': 1,
        'code': '29',
        'children': [{
            'name': 'Healthcare diagnosing or treating practitioners',
            'type': 'Summary',
            'sort': 386,
            'displayLevel': 2,
            'category': '29',
            'code': '1000'
        }, {
            'name': 'Chiropractors',
            'type': 'Line Item',
            'sort': 387,
            'displayLevel': 3,
            'category': '29',
            'code': '1011'
        }, {
            'name': 'Dentists',
            'type': 'Summary',
            'sort': 388,
            'displayLevel': 3,
            'category': '29',
            'code': '1020'
        }, {
            'name': 'Dentists, general',
            'type': 'Line Item',
            'sort': 389,
            'displayLevel': 4,
            'category': '29',
            'code': '1021'
        }, {
            'name': 'Oral and maxillofacial surgeons',
            'type': 'Line Item',
            'sort': 390,
            'displayLevel': 4,
            'category': '29',
            'code': '1022'
        }, {
            'name': 'Orthodontists',
            'type': 'Line Item',
            'sort': 391,
            'displayLevel': 4,
            'category': '29',
            'code': '1023'
        }, {
            'name': 'Prosthodontists',
            'type': 'Line Item',
            'sort': 392,
            'displayLevel': 4,
            'category': '29',
            'code': '1024'
        }, {
            'name': 'Dentists, all other specialists',
            'type': 'Line Item',
            'sort': 393,
            'displayLevel': 4,
            'category': '29',
            'code': '1029'
        }, {
            'name': 'Dietitians and nutritionists',
            'type': 'Line Item',
            'sort': 394,
            'displayLevel': 3,
            'category': '29',
            'code': '1031'
        }, {
            'name': 'Optometrists',
            'type': 'Line Item',
            'sort': 395,
            'displayLevel': 3,
            'category': '29',
            'code': '1041'
        }, {
            'name': 'Pharmacists',
            'type': 'Line Item',
            'sort': 396,
            'displayLevel': 3,
            'category': '29',
            'code': '1051'
        }, {
            'name': 'Physician assistants',
            'type': 'Line Item',
            'sort': 397,
            'displayLevel': 3,
            'category': '29',
            'code': '1071'
        }, {
            'name': 'Podiatrists',
            'type': 'Line Item',
            'sort': 398,
            'displayLevel': 3,
            'category': '29',
            'code': '1081'
        }, {
            'name': 'Therapists',
            'type': 'Summary',
            'sort': 399,
            'displayLevel': 3,
            'category': '29',
            'code': '1120'
        }, {
            'name': 'Occupational therapists',
            'type': 'Line Item',
            'sort': 400,
            'displayLevel': 4,
            'category': '29',
            'code': '1122'
        }, {
            'name': 'Physical therapists',
            'type': 'Line Item',
            'sort': 401,
            'displayLevel': 4,
            'category': '29',
            'code': '1123'
        }, {
            'name': 'Radiation therapists',
            'type': 'Line Item',
            'sort': 402,
            'displayLevel': 4,
            'category': '29',
            'code': '1124'
        }, {
            'name': 'Recreational therapists',
            'type': 'Line Item',
            'sort': 403,
            'displayLevel': 4,
            'category': '29',
            'code': '1125'
        }, {
            'name': 'Respiratory therapists',
            'type': 'Line Item',
            'sort': 404,
            'displayLevel': 4,
            'category': '29',
            'code': '1126'
        }, {
            'name': 'Speech-language pathologists',
            'type': 'Line Item',
            'sort': 405,
            'displayLevel': 4,
            'category': '29',
            'code': '1127'
        }, {
            'name': 'Exercise physiologists',
            'type': 'Line Item',
            'sort': 406,
            'displayLevel': 4,
            'category': '29',
            'code': '1128'
        }, {
            'name': 'Therapists, all other',
            'type': 'Line Item',
            'sort': 407,
            'displayLevel': 4,
            'category': '29',
            'code': '1129'
        }, {
            'name': 'Veterinarians',
            'type': 'Line Item',
            'sort': 408,
            'displayLevel': 3,
            'category': '29',
            'code': '1131'
        }, {
            'name': 'Registered nurses',
            'type': 'Line Item',
            'sort': 409,
            'displayLevel': 3,
            'category': '29',
            'code': '1141'
        }, {
            'name': 'Nurse anesthetists',
            'type': 'Line Item',
            'sort': 410,
            'displayLevel': 3,
            'category': '29',
            'code': '1151'
        }, {
            'name': 'Nurse midwives',
            'type': 'Line Item',
            'sort': 411,
            'displayLevel': 3,
            'category': '29',
            'code': '1161'
        }, {
            'name': 'Nurse practitioners',
            'type': 'Line Item',
            'sort': 412,
            'displayLevel': 3,
            'category': '29',
            'code': '1171'
        }, {
            'name': 'Audiologists',
            'type': 'Line Item',
            'sort': 413,
            'displayLevel': 3,
            'category': '29',
            'code': '1181'
        }, {
            'name': 'Anesthesiologists',
            'type': 'Line Item',
            'sort': 414,
            'displayLevel': 3,
            'category': '29',
            'code': '1211'
        }, {
            'name': 'Family medicine physicians',
            'type': 'Line Item',
            'sort': 415,
            'displayLevel': 3,
            'category': '29',
            'code': '1215'
        }, {
            'name': 'General internal medicine physicians',
            'type': 'Line Item',
            'sort': 416,
            'displayLevel': 3,
            'category': '29',
            'code': '1216'
        }, {
            'name': 'Obstetricians and gynecologists',
            'type': 'Line Item',
            'sort': 417,
            'displayLevel': 3,
            'category': '29',
            'code': '1218'
        }, {
            'name': 'Pediatricians, general',
            'type': 'Line Item',
            'sort': 418,
            'displayLevel': 3,
            'category': '29',
            'code': '1221'
        }, {
            'name': 'Psychiatrists',
            'type': 'Line Item',
            'sort': 419,
            'displayLevel': 3,
            'category': '29',
            'code': '1223'
        }, {
            'name': 'Physicians, all other; and ophthalmologists, except pediatric',
            'type': 'Line Item',
            'sort': 420,
            'displayLevel': 3,
            'category': '29',
            'code': '1228'
        }, {
            'name': 'Surgeons, except ophthalmologists',
            'type': 'Line Item',
            'sort': 421,
            'displayLevel': 3,
            'category': '29',
            'code': '1248'
        }, {
            'name': 'Miscellaneous healthcare diagnosing or treating practitioners',
            'type': 'Summary',
            'sort': 422,
            'displayLevel': 3,
            'category': '29',
            'code': '1290'
        }, {
            'name': 'Dental hygienists',
            'type': 'Line Item',
            'sort': 423,
            'displayLevel': 4,
            'category': '29',
            'code': '1292'
        }, {
            'name': 'Acupuncturists and healthcare diagnosing or treating practitioners, all other',
            'type': 'Line Item',
            'sort': 424,
            'displayLevel': 4,
            'category': '29',
            'code': '1298'
        }, {
            'name': 'Health technologists and technicians',
            'type': 'Summary',
            'sort': 425,
            'displayLevel': 2,
            'category': '29',
            'code': '2000'
        }, {
            'name': 'Clinical laboratory technologists and technicians',
            'type': 'Line Item',
            'sort': 426,
            'displayLevel': 3,
            'category': '29',
            'code': '2010'
        }, {
            'name': 'Cardiovascular technologists and technicians',
            'type': 'Line Item',
            'sort': 427,
            'displayLevel': 3,
            'category': '29',
            'code': '2031'
        }, {
            'name': 'Diagnostic medical sonographers',
            'type': 'Line Item',
            'sort': 428,
            'displayLevel': 3,
            'category': '29',
            'code': '2032'
        }, {
            'name': 'Nuclear medicine technologists',
            'type': 'Line Item',
            'sort': 429,
            'displayLevel': 3,
            'category': '29',
            'code': '2033'
        }, {
            'name': 'Radiologic technologists and technicians',
            'type': 'Line Item',
            'sort': 430,
            'displayLevel': 3,
            'category': '29',
            'code': '2034'
        }, {
            'name': 'Magnetic resonance imaging technologists',
            'type': 'Line Item',
            'sort': 431,
            'displayLevel': 3,
            'category': '29',
            'code': '2035'
        }, {
            'name': 'Emergency medical technicians and paramedics',
            'type': 'Line Item',
            'sort': 432,
            'displayLevel': 3,
            'category': '29',
            'code': '2040'
        }, {
            'name': 'Health practitioner support technologists and technicians',
            'type': 'Summary',
            'sort': 433,
            'displayLevel': 3,
            'category': '29',
            'code': '2050'
        }, {
            'name': 'Dietetic technicians',
            'type': 'Line Item',
            'sort': 434,
            'displayLevel': 4,
            'category': '29',
            'code': '2051'
        }, {
            'name': 'Pharmacy technicians',
            'type': 'Line Item',
            'sort': 435,
            'displayLevel': 4,
            'category': '29',
            'code': '2052'
        }, {
            'name': 'Psychiatric technicians',
            'type': 'Line Item',
            'sort': 436,
            'displayLevel': 4,
            'category': '29',
            'code': '2053'
        }, {
            'name': 'Surgical technologists',
            'type': 'Line Item',
            'sort': 437,
            'displayLevel': 4,
            'category': '29',
            'code': '2055'
        }, {
            'name': 'Veterinary technologists and technicians',
            'type': 'Line Item',
            'sort': 438,
            'displayLevel': 4,
            'category': '29',
            'code': '2056'
        }, {
            'name': 'Ophthalmic medical technicians',
            'type': 'Line Item',
            'sort': 439,
            'displayLevel': 4,
            'category': '29',
            'code': '2057'
        }, {
            'name': 'Licensed practical and licensed vocational nurses',
            'type': 'Line Item',
            'sort': 440,
            'displayLevel': 3,
            'category': '29',
            'code': '2061'
        }, {
            'name': 'Opticians, dispensing',
            'type': 'Line Item',
            'sort': 441,
            'displayLevel': 3,
            'category': '29',
            'code': '2081'
        }, {
            'name': 'Orthotists and prosthetists',
            'type': 'Line Item',
            'sort': 442,
            'displayLevel': 3,
            'category': '29',
            'code': '2091'
        }, {
            'name': 'Hearing aid specialists',
            'type': 'Line Item',
            'sort': 443,
            'displayLevel': 3,
            'category': '29',
            'code': '2092'
        }, {
            'name': 'Medical dosimetrists, medical records specialists, and health technologists and technicians, all other',
            'type': 'Line Item',
            'sort': 444,
            'displayLevel': 3,
            'category': '29',
            'code': '2098'
        }, {
            'name': 'Other healthcare practitioners and technical occupations',
            'type': 'Summary',
            'sort': 445,
            'displayLevel': 2,
            'category': '29',
            'code': '9000'
        }, {
            'name': 'Athletic trainers',
            'type': 'Line Item',
            'sort': 446,
            'displayLevel': 3,
            'category': '29',
            'code': '9091'
        }, {
            'name': 'Genetic counselors',
            'type': 'Line Item',
            'sort': 447,
            'displayLevel': 3,
            'category': '29',
            'code': '9092'
        }, {
            'name': 'Health information technologists, medical registrars, surgical assistants, and healthcare practitioners and technical workers, all other',
            'type': 'Line Item',
            'sort': 448,
            'displayLevel': 3,
            'category': '29',
            'code': '9098'
        }]
    }, {
        'name': 'Healthcare support occupations',
        'type': 'Summary',
        'sort': 449,
        'displayLevel': 1,
        'code': '31',
        'children': [{
            'name': 'Home health and personal care aides; and nursing assistants, orderlies, and psychiatric aides',
            'type': 'Summary',
            'sort': 450,
            'displayLevel': 2,
            'category': '31',
            'code': '1100'
        }, {
            'name': 'Home health and personal care aides',
            'type': 'Line Item',
            'sort': 451,
            'displayLevel': 3,
            'category': '31',
            'code': '1120'
        }, {
            'name': 'Nursing assistants, orderlies, and psychiatric aides',
            'type': 'Summary',
            'sort': 452,
            'displayLevel': 3,
            'category': '31',
            'code': '1130'
        }, {
            'name': 'Nursing assistants',
            'type': 'Line Item',
            'sort': 453,
            'displayLevel': 4,
            'category': '31',
            'code': '1131'
        }, {
            'name': 'Orderlies',
            'type': 'Line Item',
            'sort': 454,
            'displayLevel': 4,
            'category': '31',
            'code': '1132'
        }, {
            'name': 'Psychiatric aides',
            'type': 'Line Item',
            'sort': 455,
            'displayLevel': 4,
            'category': '31',
            'code': '1133'
        }, {
            'name': 'Occupational therapy and physical therapist assistants and aides',
            'type': 'Summary',
            'sort': 456,
            'displayLevel': 2,
            'category': '31',
            'code': '2000'
        }, {
            'name': 'Occupational therapy assistants and aides',
            'type': 'Summary',
            'sort': 457,
            'displayLevel': 3,
            'category': '31',
            'code': '2010'
        }, {
            'name': 'Occupational therapy assistants',
            'type': 'Line Item',
            'sort': 458,
            'displayLevel': 4,
            'category': '31',
            'code': '2011'
        }, {
            'name': 'Occupational therapy aides',
            'type': 'Line Item',
            'sort': 459,
            'displayLevel': 4,
            'category': '31',
            'code': '2012'
        }, {
            'name': 'Physical therapist assistants and aides',
            'type': 'Summary',
            'sort': 460,
            'displayLevel': 3,
            'category': '31',
            'code': '2020'
        }, {
            'name': 'Physical therapist assistants',
            'type': 'Line Item',
            'sort': 461,
            'displayLevel': 4,
            'category': '31',
            'code': '2021'
        }, {
            'name': 'Physical therapist aides',
            'type': 'Line Item',
            'sort': 462,
            'displayLevel': 4,
            'category': '31',
            'code': '2022'
        }, {
            'name': 'Other healthcare support occupations',
            'type': 'Summary',
            'sort': 463,
            'displayLevel': 2,
            'category': '31',
            'code': '9000'
        }, {
            'name': 'Massage therapists',
            'type': 'Line Item',
            'sort': 464,
            'displayLevel': 3,
            'category': '31',
            'code': '9011'
        }, {
            'name': 'Miscellaneous healthcare support occupations',
            'type': 'Summary',
            'sort': 465,
            'displayLevel': 3,
            'category': '31',
            'code': '9090'
        }, {
            'name': 'Dental assistants',
            'type': 'Line Item',
            'sort': 466,
            'displayLevel': 4,
            'category': '31',
            'code': '9091'
        }, {
            'name': 'Medical assistants',
            'type': 'Line Item',
            'sort': 467,
            'displayLevel': 4,
            'category': '31',
            'code': '9092'
        }, {
            'name': 'Medical equipment preparers',
            'type': 'Line Item',
            'sort': 468,
            'displayLevel': 4,
            'category': '31',
            'code': '9093'
        }, {
            'name': 'Medical transcriptionists',
            'type': 'Line Item',
            'sort': 469,
            'displayLevel': 4,
            'category': '31',
            'code': '9094'
        }, {
            'name': 'Pharmacy aides',
            'type': 'Line Item',
            'sort': 470,
            'displayLevel': 4,
            'category': '31',
            'code': '9095'
        }, {
            'name': 'Veterinary assistants and laboratory animal caretakers',
            'type': 'Line Item',
            'sort': 471,
            'displayLevel': 4,
            'category': '31',
            'code': '9096'
        }, {
            'name': 'Phlebotomists',
            'type': 'Line Item',
            'sort': 472,
            'displayLevel': 4,
            'category': '31',
            'code': '9097'
        }, {
            'name': 'Healthcare support workers, all other',
            'type': 'Line Item',
            'sort': 473,
            'displayLevel': 4,
            'category': '31',
            'code': '9099'
        }]
    }, {
        'name': 'Protective service occupations',
        'type': 'Summary',
        'sort': 474,
        'displayLevel': 1,
        'code': '33',
        'children': [{
            'name': 'Supervisors of protective service workers',
            'type': 'Summary',
            'sort': 475,
            'displayLevel': 2,
            'category': '33',
            'code': '1000'
        }, {
            'name': 'First-line supervisors of law enforcement workers',
            'type': 'Summary',
            'sort': 476,
            'displayLevel': 3,
            'category': '33',
            'code': '1010'
        }, {
            'name': 'First-line supervisors of correctional officers',
            'type': 'Line Item',
            'sort': 477,
            'displayLevel': 4,
            'category': '33',
            'code': '1011'
        }, {
            'name': 'First-line supervisors of police and detectives',
            'type': 'Line Item',
            'sort': 478,
            'displayLevel': 4,
            'category': '33',
            'code': '1012'
        }, {
            'name': 'First-line supervisors of firefighting and prevention workers',
            'type': 'Line Item',
            'sort': 479,
            'displayLevel': 3,
            'category': '33',
            'code': '1021'
        }, {
            'name': 'Miscellaneous first-line supervisors, protective service workers',
            'type': 'Line Item',
            'sort': 480,
            'displayLevel': 3,
            'category': '33',
            'code': '1090'
        }, {
            'name': 'Firefighting and prevention workers',
            'type': 'Summary',
            'sort': 481,
            'displayLevel': 2,
            'category': '33',
            'code': '2000'
        }, {
            'name': 'Firefighters',
            'type': 'Line Item',
            'sort': 482,
            'displayLevel': 3,
            'category': '33',
            'code': '2011'
        }, {
            'name': 'Fire inspectors',
            'type': 'Summary',
            'sort': 483,
            'displayLevel': 3,
            'category': '33',
            'code': '2020'
        }, {
            'name': 'Fire inspectors and investigators',
            'type': 'Line Item',
            'sort': 484,
            'displayLevel': 4,
            'category': '33',
            'code': '2021'
        }, {
            'name': 'Forest fire inspectors and prevention specialists',
            'type': 'Line Item',
            'sort': 485,
            'displayLevel': 4,
            'category': '33',
            'code': '2022'
        }, {
            'name': 'Law enforcement workers',
            'type': 'Summary',
            'sort': 486,
            'displayLevel': 2,
            'category': '33',
            'code': '3000'
        }, {
            'name': 'Bailiffs, correctional officers, and jailers',
            'type': 'Summary',
            'sort': 487,
            'displayLevel': 3,
            'category': '33',
            'code': '3010'
        }, {
            'name': 'Bailiffs',
            'type': 'Line Item',
            'sort': 488,
            'displayLevel': 4,
            'category': '33',
            'code': '3011'
        }, {
            'name': 'Correctional officers and jailers',
            'type': 'Line Item',
            'sort': 489,
            'displayLevel': 4,
            'category': '33',
            'code': '3012'
        }, {
            'name': 'Detectives and criminal investigators',
            'type': 'Line Item',
            'sort': 490,
            'displayLevel': 3,
            'category': '33',
            'code': '3021'
        }, {
            'name': 'Fish and game wardens',
            'type': 'Line Item',
            'sort': 491,
            'displayLevel': 3,
            'category': '33',
            'code': '3031'
        }, {
            'name': 'Parking enforcement workers',
            'type': 'Line Item',
            'sort': 492,
            'displayLevel': 3,
            'category': '33',
            'code': '3041'
        }, {
            'name': 'Police officers',
            'type': 'Summary',
            'sort': 493,
            'displayLevel': 3,
            'category': '33',
            'code': '3050'
        }, {
            'name': 'Police and sheriff\'s patrol officers',
            'type': 'Line Item',
            'sort': 494,
            'displayLevel': 4,
            'category': '33',
            'code': '3051'
        }, {
            'name': 'Transit and railroad police',
            'type': 'Line Item',
            'sort': 495,
            'displayLevel': 4,
            'category': '33',
            'code': '3052'
        }, {
            'name': 'Other protective service workers',
            'type': 'Summary',
            'sort': 496,
            'displayLevel': 2,
            'category': '33',
            'code': '9000'
        }, {
            'name': 'Animal control workers',
            'type': 'Line Item',
            'sort': 497,
            'displayLevel': 3,
            'category': '33',
            'code': '9011'
        }, {
            'name': 'Private detectives and investigators',
            'type': 'Line Item',
            'sort': 498,
            'displayLevel': 3,
            'category': '33',
            'code': '9021'
        }, {
            'name': 'Security guards and gambling surveillance officers',
            'type': 'Summary',
            'sort': 499,
            'displayLevel': 3,
            'category': '33',
            'code': '9030'
        }, {
            'name': 'Gambling surveillance officers and gambling investigators',
            'type': 'Line Item',
            'sort': 500,
            'displayLevel': 4,
            'category': '33',
            'code': '9031'
        }, {
            'name': 'Security guards',
            'type': 'Line Item',
            'sort': 501,
            'displayLevel': 4,
            'category': '33',
            'code': '9032'
        }, {
            'name': 'Miscellaneous protective service workers',
            'type': 'Summary',
            'sort': 502,
            'displayLevel': 3,
            'category': '33',
            'code': '9090'
        }, {
            'name': 'Crossing guards and flaggers',
            'type': 'Line Item',
            'sort': 503,
            'displayLevel': 4,
            'category': '33',
            'code': '9091'
        }, {
            'name': 'Lifeguards, ski patrol, and other recreational protective service workers',
            'type': 'Line Item',
            'sort': 504,
            'displayLevel': 4,
            'category': '33',
            'code': '9092'
        }, {
            'name': 'Transportation security screeners',
            'type': 'Line Item',
            'sort': 505,
            'displayLevel': 4,
            'category': '33',
            'code': '9093'
        }, {
            'name': 'School bus monitors and protective service workers, all other',
            'type': 'Line Item',
            'sort': 506,
            'displayLevel': 4,
            'category': '33',
            'code': '9098'
        }]
    }, {
        'name': 'Food preparation and serving related occupations',
        'type': 'Summary',
        'sort': 507,
        'displayLevel': 1,
        'code': '35',
        'children': [{
            'name': 'Supervisors of food preparation and serving workers',
            'type': 'Summary',
            'sort': 508,
            'displayLevel': 2,
            'category': '35',
            'code': '1000'
        }, {
            'name': 'Chefs and head cooks',
            'type': 'Line Item',
            'sort': 509,
            'displayLevel': 3,
            'category': '35',
            'code': '1011'
        }, {
            'name': 'First-line supervisors of food preparation and serving workers',
            'type': 'Line Item',
            'sort': 510,
            'displayLevel': 3,
            'category': '35',
            'code': '1012'
        }, {
            'name': 'Cooks and food preparation workers',
            'type': 'Summary',
            'sort': 511,
            'displayLevel': 2,
            'category': '35',
            'code': '2000'
        }, {
            'name': 'Cooks',
            'type': 'Summary',
            'sort': 512,
            'displayLevel': 3,
            'category': '35',
            'code': '2010'
        }, {
            'name': 'Cooks, fast food',
            'type': 'Line Item',
            'sort': 513,
            'displayLevel': 4,
            'category': '35',
            'code': '2011'
        }, {
            'name': 'Cooks, institution and cafeteria',
            'type': 'Line Item',
            'sort': 514,
            'displayLevel': 4,
            'category': '35',
            'code': '2012'
        }, {
            'name': 'Cooks, private household',
            'type': 'Line Item',
            'sort': 515,
            'displayLevel': 4,
            'category': '35',
            'code': '2013'
        }, {
            'name': 'Cooks, restaurant',
            'type': 'Line Item',
            'sort': 516,
            'displayLevel': 4,
            'category': '35',
            'code': '2014'
        }, {
            'name': 'Cooks, short order',
            'type': 'Line Item',
            'sort': 517,
            'displayLevel': 4,
            'category': '35',
            'code': '2015'
        }, {
            'name': 'Cooks, all other',
            'type': 'Line Item',
            'sort': 518,
            'displayLevel': 4,
            'category': '35',
            'code': '2019'
        }, {
            'name': 'Food preparation workers',
            'type': 'Line Item',
            'sort': 519,
            'displayLevel': 3,
            'category': '35',
            'code': '2021'
        }, {
            'name': 'Food and beverage serving workers',
            'type': 'Summary',
            'sort': 520,
            'displayLevel': 2,
            'category': '35',
            'code': '3000'
        }, {
            'name': 'Bartenders',
            'type': 'Line Item',
            'sort': 521,
            'displayLevel': 3,
            'category': '35',
            'code': '3011'
        }, {
            'name': 'Fast food and counter workers',
            'type': 'Line Item',
            'sort': 522,
            'displayLevel': 3,
            'category': '35',
            'code': '3023'
        }, {
            'name': 'Waiters and waitresses',
            'type': 'Line Item',
            'sort': 523,
            'displayLevel': 3,
            'category': '35',
            'code': '3031'
        }, {
            'name': 'Food servers, nonrestaurant',
            'type': 'Line Item',
            'sort': 524,
            'displayLevel': 3,
            'category': '35',
            'code': '3041'
        }, {
            'name': 'Other food preparation and serving related workers',
            'type': 'Summary',
            'sort': 525,
            'displayLevel': 2,
            'category': '35',
            'code': '9000'
        }, {
            'name': 'Dining room and cafeteria attendants and bartender helpers',
            'type': 'Line Item',
            'sort': 526,
            'displayLevel': 3,
            'category': '35',
            'code': '9011'
        }, {
            'name': 'Dishwashers',
            'type': 'Line Item',
            'sort': 527,
            'displayLevel': 3,
            'category': '35',
            'code': '9021'
        }, {
            'name': 'Hosts and hostesses, restaurant, lounge, and coffee shop',
            'type': 'Line Item',
            'sort': 528,
            'displayLevel': 3,
            'category': '35',
            'code': '9031'
        }, {
            'name': 'Food preparation and serving related workers, all other',
            'type': 'Line Item',
            'sort': 529,
            'displayLevel': 3,
            'category': '35',
            'code': '9099'
        }]
    }, {
        'name': 'Building and grounds cleaning and maintenance occupations',
        'type': 'Summary',
        'sort': 530,
        'displayLevel': 1,
        'code': '37',
        'children': [{
            'name': 'Supervisors of building and grounds cleaning and maintenance workers',
            'type': 'Summary',
            'sort': 531,
            'displayLevel': 2,
            'category': '37',
            'code': '1000'
        }, {
            'name': 'First-line supervisors of housekeeping and janitorial workers',
            'type': 'Line Item',
            'sort': 532,
            'displayLevel': 3,
            'category': '37',
            'code': '1011'
        }, {
            'name': 'First-line supervisors of landscaping, lawn service, and groundskeeping workers',
            'type': 'Line Item',
            'sort': 533,
            'displayLevel': 3,
            'category': '37',
            'code': '1012'
        }, {
            'name': 'Building cleaning and pest control workers',
            'type': 'Summary',
            'sort': 534,
            'displayLevel': 2,
            'category': '37',
            'code': '2000'
        }, {
            'name': 'Building cleaning workers',
            'type': 'Summary',
            'sort': 535,
            'displayLevel': 3,
            'category': '37',
            'code': '2010'
        }, {
            'name': 'Janitors and cleaners, except maids and housekeeping cleaners',
            'type': 'Line Item',
            'sort': 536,
            'displayLevel': 4,
            'category': '37',
            'code': '2011'
        }, {
            'name': 'Maids and housekeeping cleaners',
            'type': 'Line Item',
            'sort': 537,
            'displayLevel': 4,
            'category': '37',
            'code': '2012'
        }, {
            'name': 'Building cleaning workers, all other',
            'type': 'Line Item',
            'sort': 538,
            'displayLevel': 4,
            'category': '37',
            'code': '2019'
        }, {
            'name': 'Pest control workers',
            'type': 'Line Item',
            'sort': 539,
            'displayLevel': 3,
            'category': '37',
            'code': '2021'
        }, {
            'name': 'Grounds maintenance workers',
            'type': 'Summary',
            'sort': 540,
            'displayLevel': 2,
            'category': '37',
            'code': '3000'
        }, {
            'name': 'Landscaping and groundskeeping workers',
            'type': 'Line Item',
            'sort': 541,
            'displayLevel': 3,
            'category': '37',
            'code': '3011'
        }, {
            'name': 'Pesticide handlers, sprayers, and applicators, vegetation',
            'type': 'Line Item',
            'sort': 542,
            'displayLevel': 3,
            'category': '37',
            'code': '3012'
        }, {
            'name': 'Tree trimmers and pruners',
            'type': 'Line Item',
            'sort': 543,
            'displayLevel': 3,
            'category': '37',
            'code': '3013'
        }, {
            'name': 'Grounds maintenance workers, all other',
            'type': 'Line Item',
            'sort': 544,
            'displayLevel': 3,
            'category': '37',
            'code': '3019'
        }]
    }, {
        'name': 'Personal care and service occupations',
        'type': 'Summary',
        'sort': 545,
        'displayLevel': 1,
        'code': '39',
        'children': [{
            'name': 'Supervisors of personal care and service workers',
            'type': 'Summary',
            'sort': 546,
            'displayLevel': 2,
            'category': '39',
            'code': '1000'
        }, {
            'name': 'First-line supervisors of gambling services workers',
            'type': 'Line Item',
            'sort': 547,
            'displayLevel': 3,
            'category': '39',
            'code': '1013'
        }, {
            'name': 'First-line supervisors of personal service and entertainment and recreation workers, except gambling services',
            'type': 'Line Item',
            'sort': 548,
            'displayLevel': 3,
            'category': '39',
            'code': '1098'
        }, {
            'name': 'Animal care and service workers',
            'type': 'Summary',
            'sort': 549,
            'displayLevel': 2,
            'category': '39',
            'code': '2000'
        }, {
            'name': 'Animal trainers',
            'type': 'Line Item',
            'sort': 550,
            'displayLevel': 3,
            'category': '39',
            'code': '2011'
        }, {
            'name': 'Animal caretakers',
            'type': 'Line Item',
            'sort': 551,
            'displayLevel': 3,
            'category': '39',
            'code': '2021'
        }, {
            'name': 'Entertainment attendants and related workers',
            'type': 'Summary',
            'sort': 552,
            'displayLevel': 2,
            'category': '39',
            'code': '3000'
        }, {
            'name': 'Gambling services workers',
            'type': 'Summary',
            'sort': 553,
            'displayLevel': 3,
            'category': '39',
            'code': '3010'
        }, {
            'name': 'Gambling dealers',
            'type': 'Line Item',
            'sort': 554,
            'displayLevel': 4,
            'category': '39',
            'code': '3011'
        }, {
            'name': 'Gambling and sports book writers and runners',
            'type': 'Line Item',
            'sort': 555,
            'displayLevel': 4,
            'category': '39',
            'code': '3012'
        }, {
            'name': 'Gambling service workers, all other',
            'type': 'Line Item',
            'sort': 556,
            'displayLevel': 4,
            'category': '39',
            'code': '3019'
        }, {
            'name': 'Motion picture projectionists',
            'type': 'Line Item',
            'sort': 557,
            'displayLevel': 3,
            'category': '39',
            'code': '3021'
        }, {
            'name': 'Ushers, lobby attendants, and ticket takers',
            'type': 'Line Item',
            'sort': 558,
            'displayLevel': 3,
            'category': '39',
            'code': '3031'
        }, {
            'name': 'Miscellaneous entertainment attendants and related workers',
            'type': 'Summary',
            'sort': 559,
            'displayLevel': 3,
            'category': '39',
            'code': '3090'
        }, {
            'name': 'Amusement and recreation attendants',
            'type': 'Line Item',
            'sort': 560,
            'displayLevel': 4,
            'category': '39',
            'code': '3091'
        }, {
            'name': 'Costume attendants',
            'type': 'Line Item',
            'sort': 561,
            'displayLevel': 4,
            'category': '39',
            'code': '3092'
        }, {
            'name': 'Locker room, coatroom, and dressing room attendants',
            'type': 'Line Item',
            'sort': 562,
            'displayLevel': 4,
            'category': '39',
            'code': '3093'
        }, {
            'name': 'Entertainment attendants and related workers, all other',
            'type': 'Line Item',
            'sort': 563,
            'displayLevel': 4,
            'category': '39',
            'code': '3099'
        }, {
            'name': 'Embalmers',
            'type': 'Line Item',
            'sort': 564,
            'displayLevel': 2,
            'category': '39',
            'code': '4011'
        }, {
            'name': 'Funeral attendants',
            'type': 'Line Item',
            'sort': 565,
            'displayLevel': 2,
            'category': '39',
            'code': '4021'
        }, {
            'name': 'Morticians, undertakers, and funeral arrangers',
            'type': 'Line Item',
            'sort': 566,
            'displayLevel': 2,
            'category': '39',
            'code': '4031'
        }, {
            'name': 'Personal appearance workers',
            'type': 'Summary',
            'sort': 567,
            'displayLevel': 2,
            'category': '39',
            'code': '5000'
        }, {
            'name': 'Barbers, hairdressers, hairstylists and cosmetologists',
            'type': 'Summary',
            'sort': 568,
            'displayLevel': 3,
            'category': '39',
            'code': '5010'
        }, {
            'name': 'Barbers',
            'type': 'Line Item',
            'sort': 569,
            'displayLevel': 4,
            'category': '39',
            'code': '5011'
        }, {
            'name': 'Hairdressers, hairstylists, and cosmetologists',
            'type': 'Line Item',
            'sort': 570,
            'displayLevel': 4,
            'category': '39',
            'code': '5012'
        }, {
            'name': 'Miscellaneous personal appearance workers',
            'type': 'Summary',
            'sort': 571,
            'displayLevel': 3,
            'category': '39',
            'code': '5090'
        }, {
            'name': 'Makeup artists, theatrical and performance',
            'type': 'Line Item',
            'sort': 572,
            'displayLevel': 4,
            'category': '39',
            'code': '5091'
        }, {
            'name': 'Manicurists and pedicurists',
            'type': 'Line Item',
            'sort': 573,
            'displayLevel': 4,
            'category': '39',
            'code': '5092'
        }, {
            'name': 'Shampooers',
            'type': 'Line Item',
            'sort': 574,
            'displayLevel': 4,
            'category': '39',
            'code': '5093'
        }, {
            'name': 'Skincare specialists',
            'type': 'Line Item',
            'sort': 575,
            'displayLevel': 4,
            'category': '39',
            'code': '5094'
        }, {
            'name': 'Baggage porters, bellhops, and concierges',
            'type': 'Summary',
            'sort': 576,
            'displayLevel': 2,
            'category': '39',
            'code': '6000'
        }, {
            'name': 'Baggage porters and bellhops',
            'type': 'Line Item',
            'sort': 577,
            'displayLevel': 3,
            'category': '39',
            'code': '6011'
        }, {
            'name': 'Concierges',
            'type': 'Line Item',
            'sort': 578,
            'displayLevel': 3,
            'category': '39',
            'code': '6012'
        }, {
            'name': 'Tour and travel guides',
            'type': 'Summary',
            'sort': 579,
            'displayLevel': 2,
            'category': '39',
            'code': '7000'
        }, {
            'name': 'Tour and travel guides',
            'type': 'Line Item',
            'sort': 580,
            'displayLevel': 3,
            'category': '39',
            'code': '7010'
        }, {
            'name': 'Childcare workers',
            'type': 'Line Item',
            'sort': 581,
            'displayLevel': 2,
            'category': '39',
            'code': '9011'
        }, {
            'name': 'Recreation and fitness workers',
            'type': 'Summary',
            'sort': 582,
            'displayLevel': 2,
            'category': '39',
            'code': '9030'
        }, {
            'name': 'Exercise trainers and group fitness instructors',
            'type': 'Line Item',
            'sort': 583,
            'displayLevel': 3,
            'category': '39',
            'code': '9031'
        }, {
            'name': 'Recreation workers',
            'type': 'Line Item',
            'sort': 584,
            'displayLevel': 3,
            'category': '39',
            'code': '9032'
        }, {
            'name': 'Residential advisors',
            'type': 'Line Item',
            'sort': 585,
            'displayLevel': 2,
            'category': '39',
            'code': '9041'
        }, {
            'name': 'Crematory operators and personal care and service workers, all other',
            'type': 'Line Item',
            'sort': 586,
            'displayLevel': 2,
            'category': '39',
            'code': '9098'
        }]
    }, {
        'name': 'Sales and related occupations',
        'type': 'Summary',
        'sort': 587,
        'displayLevel': 1,
        'code': '41',
        'children': [{
            'name': 'Supervisors of sales workers',
            'type': 'Summary',
            'sort': 588,
            'displayLevel': 2,
            'category': '41',
            'code': '1000'
        }, {
            'name': 'First-line supervisors of retail sales workers',
            'type': 'Line Item',
            'sort': 589,
            'displayLevel': 3,
            'category': '41',
            'code': '1011'
        }, {
            'name': 'First-line supervisors of non-retail sales workers',
            'type': 'Line Item',
            'sort': 590,
            'displayLevel': 3,
            'category': '41',
            'code': '1012'
        }, {
            'name': 'Retail sales workers',
            'type': 'Summary',
            'sort': 591,
            'displayLevel': 2,
            'category': '41',
            'code': '2000'
        }, {
            'name': 'Cashiers',
            'type': 'Summary',
            'sort': 592,
            'displayLevel': 3,
            'category': '41',
            'code': '2010'
        }, {
            'name': 'Cashiers',
            'type': 'Line Item',
            'sort': 593,
            'displayLevel': 4,
            'category': '41',
            'code': '2011'
        }, {
            'name': 'Gambling change persons and booth cashiers',
            'type': 'Line Item',
            'sort': 594,
            'displayLevel': 4,
            'category': '41',
            'code': '2012'
        }, {
            'name': 'Counter and rental clerks and parts salespersons',
            'type': 'Summary',
            'sort': 595,
            'displayLevel': 3,
            'category': '41',
            'code': '2020'
        }, {
            'name': 'Counter and rental clerks',
            'type': 'Line Item',
            'sort': 596,
            'displayLevel': 4,
            'category': '41',
            'code': '2021'
        }, {
            'name': 'Parts salespersons',
            'type': 'Line Item',
            'sort': 597,
            'displayLevel': 4,
            'category': '41',
            'code': '2022'
        }, {
            'name': 'Retail salespersons',
            'type': 'Line Item',
            'sort': 598,
            'displayLevel': 3,
            'category': '41',
            'code': '2031'
        }, {
            'name': 'Sales representatives, services',
            'type': 'Summary',
            'sort': 599,
            'displayLevel': 2,
            'category': '41',
            'code': '3000'
        }, {
            'name': 'Advertising sales agents',
            'type': 'Line Item',
            'sort': 600,
            'displayLevel': 3,
            'category': '41',
            'code': '3011'
        }, {
            'name': 'Insurance sales agents',
            'type': 'Line Item',
            'sort': 601,
            'displayLevel': 3,
            'category': '41',
            'code': '3021'
        }, {
            'name': 'Securities, commodities, and financial services sales agents',
            'type': 'Line Item',
            'sort': 602,
            'displayLevel': 3,
            'category': '41',
            'code': '3031'
        }, {
            'name': 'Travel agents',
            'type': 'Line Item',
            'sort': 603,
            'displayLevel': 3,
            'category': '41',
            'code': '3041'
        }, {
            'name': 'Sales representatives of services, except advertising, insurance, financial services, and travel',
            'type': 'Line Item',
            'sort': 604,
            'displayLevel': 3,
            'category': '41',
            'code': '3091'
        }, {
            'name': 'Sales representatives, wholesale and manufacturing',
            'type': 'Summary',
            'sort': 605,
            'displayLevel': 2,
            'category': '41',
            'code': '4000'
        }, {
            'name': 'Sales representatives, wholesale and manufacturing, technical and scientific products',
            'type': 'Line Item',
            'sort': 606,
            'displayLevel': 3,
            'category': '41',
            'code': '4011'
        }, {
            'name': 'Sales representatives, wholesale and manufacturing, except technical and scientific products',
            'type': 'Line Item',
            'sort': 607,
            'displayLevel': 3,
            'category': '41',
            'code': '4012'
        }, {
            'name': 'Other sales and related workers',
            'type': 'Summary',
            'sort': 608,
            'displayLevel': 2,
            'category': '41',
            'code': '9000'
        }, {
            'name': 'Models, demonstrators, and product promoters',
            'type': 'Summary',
            'sort': 609,
            'displayLevel': 3,
            'category': '41',
            'code': '9010'
        }, {
            'name': 'Demonstrators and product promoters',
            'type': 'Line Item',
            'sort': 610,
            'displayLevel': 4,
            'category': '41',
            'code': '9011'
        }, {
            'name': 'Models',
            'type': 'Line Item',
            'sort': 611,
            'displayLevel': 4,
            'category': '41',
            'code': '9012'
        }, {
            'name': 'Real estate brokers and sales agents',
            'type': 'Summary',
            'sort': 612,
            'displayLevel': 3,
            'category': '41',
            'code': '9020'
        }, {
            'name': 'Real estate brokers',
            'type': 'Line Item',
            'sort': 613,
            'displayLevel': 4,
            'category': '41',
            'code': '9021'
        }, {
            'name': 'Real estate sales agents',
            'type': 'Line Item',
            'sort': 614,
            'displayLevel': 4,
            'category': '41',
            'code': '9022'
        }, {
            'name': 'Sales engineers',
            'type': 'Line Item',
            'sort': 615,
            'displayLevel': 3,
            'category': '41',
            'code': '9031'
        }, {
            'name': 'Telemarketers',
            'type': 'Line Item',
            'sort': 616,
            'displayLevel': 3,
            'category': '41',
            'code': '9041'
        }, {
            'name': 'Miscellaneous sales and related workers',
            'type': 'Summary',
            'sort': 617,
            'displayLevel': 3,
            'category': '41',
            'code': '9090'
        }, {
            'name': 'Door-to-door sales workers, news and street vendors, and related workers',
            'type': 'Line Item',
            'sort': 618,
            'displayLevel': 4,
            'category': '41',
            'code': '9091'
        }, {
            'name': 'Sales and related workers, all other',
            'type': 'Line Item',
            'sort': 619,
            'displayLevel': 4,
            'category': '41',
            'code': '9099'
        }]
    }, {
        'name': 'Office and administrative support occupations',
        'type': 'Summary',
        'sort': 620,
        'displayLevel': 1,
        'code': '43',
        'children': [{
            'name': 'Supervisors of office and administrative support workers',
            'type': 'Summary',
            'sort': 621,
            'displayLevel': 2,
            'category': '43',
            'code': '1000'
        }, {
            'name': 'First-line supervisors of office and administrative support workers',
            'type': 'Line Item',
            'sort': 622,
            'displayLevel': 3,
            'category': '43',
            'code': '1011'
        }, {
            'name': 'Communications equipment operators',
            'type': 'Summary',
            'sort': 623,
            'displayLevel': 2,
            'category': '43',
            'code': '2000'
        }, {
            'name': 'Switchboard operators, including answering service',
            'type': 'Line Item',
            'sort': 624,
            'displayLevel': 3,
            'category': '43',
            'code': '2011'
        }, {
            'name': 'Telephone operators',
            'type': 'Line Item',
            'sort': 625,
            'displayLevel': 3,
            'category': '43',
            'code': '2021'
        }, {
            'name': 'Communications equipment operators, all other',
            'type': 'Line Item',
            'sort': 626,
            'displayLevel': 3,
            'category': '43',
            'code': '2099'
        }, {
            'name': 'Financial clerks',
            'type': 'Summary',
            'sort': 627,
            'displayLevel': 2,
            'category': '43',
            'code': '3000'
        }, {
            'name': 'Bill and account collectors',
            'type': 'Line Item',
            'sort': 628,
            'displayLevel': 3,
            'category': '43',
            'code': '3011'
        }, {
            'name': 'Billing and posting clerks',
            'type': 'Line Item',
            'sort': 629,
            'displayLevel': 3,
            'category': '43',
            'code': '3021'
        }, {
            'name': 'Bookkeeping, accounting, and auditing clerks',
            'type': 'Line Item',
            'sort': 630,
            'displayLevel': 3,
            'category': '43',
            'code': '3031'
        }, {
            'name': 'Gambling cage workers',
            'type': 'Line Item',
            'sort': 631,
            'displayLevel': 3,
            'category': '43',
            'code': '3041'
        }, {
            'name': 'Payroll and timekeeping clerks',
            'type': 'Line Item',
            'sort': 632,
            'displayLevel': 3,
            'category': '43',
            'code': '3051'
        }, {
            'name': 'Procurement clerks',
            'type': 'Line Item',
            'sort': 633,
            'displayLevel': 3,
            'category': '43',
            'code': '3061'
        }, {
            'name': 'Tellers',
            'type': 'Line Item',
            'sort': 634,
            'displayLevel': 3,
            'category': '43',
            'code': '3071'
        }, {
            'name': 'Financial clerks, all other',
            'type': 'Line Item',
            'sort': 635,
            'displayLevel': 3,
            'category': '43',
            'code': '3099'
        }, {
            'name': 'Information and record clerks',
            'type': 'Summary',
            'sort': 636,
            'displayLevel': 2,
            'category': '43',
            'code': '4000'
        }, {
            'name': 'Brokerage clerks',
            'type': 'Line Item',
            'sort': 637,
            'displayLevel': 3,
            'category': '43',
            'code': '4011'
        }, {
            'name': 'Correspondence clerks',
            'type': 'Line Item',
            'sort': 638,
            'displayLevel': 3,
            'category': '43',
            'code': '4021'
        }, {
            'name': 'Court, municipal, and license clerks',
            'type': 'Line Item',
            'sort': 639,
            'displayLevel': 3,
            'category': '43',
            'code': '4031'
        }, {
            'name': 'Credit authorizers, checkers, and clerks',
            'type': 'Line Item',
            'sort': 640,
            'displayLevel': 3,
            'category': '43',
            'code': '4041'
        }, {
            'name': 'Customer service representatives',
            'type': 'Line Item',
            'sort': 641,
            'displayLevel': 3,
            'category': '43',
            'code': '4051'
        }, {
            'name': 'Eligibility interviewers, government programs',
            'type': 'Line Item',
            'sort': 642,
            'displayLevel': 3,
            'category': '43',
            'code': '4061'
        }, {
            'name': 'File clerks',
            'type': 'Line Item',
            'sort': 643,
            'displayLevel': 3,
            'category': '43',
            'code': '4071'
        }, {
            'name': 'Hotel, motel, and resort desk clerks',
            'type': 'Line Item',
            'sort': 644,
            'displayLevel': 3,
            'category': '43',
            'code': '4081'
        }, {
            'name': 'Interviewers, except eligibility and loan',
            'type': 'Line Item',
            'sort': 645,
            'displayLevel': 3,
            'category': '43',
            'code': '4111'
        }, {
            'name': 'Library assistants, clerical',
            'type': 'Line Item',
            'sort': 646,
            'displayLevel': 3,
            'category': '43',
            'code': '4121'
        }, {
            'name': 'Loan interviewers and clerks',
            'type': 'Line Item',
            'sort': 647,
            'displayLevel': 3,
            'category': '43',
            'code': '4131'
        }, {
            'name': 'New accounts clerks',
            'type': 'Line Item',
            'sort': 648,
            'displayLevel': 3,
            'category': '43',
            'code': '4141'
        }, {
            'name': 'Order clerks',
            'type': 'Line Item',
            'sort': 649,
            'displayLevel': 3,
            'category': '43',
            'code': '4151'
        }, {
            'name': 'Human resources assistants, except payroll and timekeeping',
            'type': 'Line Item',
            'sort': 650,
            'displayLevel': 3,
            'category': '43',
            'code': '4161'
        }, {
            'name': 'Receptionists and information clerks',
            'type': 'Line Item',
            'sort': 651,
            'displayLevel': 3,
            'category': '43',
            'code': '4171'
        }, {
            'name': 'Reservation and transportation ticket agents and travel clerks',
            'type': 'Line Item',
            'sort': 652,
            'displayLevel': 3,
            'category': '43',
            'code': '4181'
        }, {
            'name': 'Information and record clerks, all other',
            'type': 'Line Item',
            'sort': 653,
            'displayLevel': 3,
            'category': '43',
            'code': '4199'
        }, {
            'name': 'Material recording, scheduling, dispatching, and distributing workers',
            'type': 'Summary',
            'sort': 654,
            'displayLevel': 2,
            'category': '43',
            'code': '5000'
        }, {
            'name': 'Cargo and freight agents',
            'type': 'Line Item',
            'sort': 655,
            'displayLevel': 3,
            'category': '43',
            'code': '5011'
        }, {
            'name': 'Couriers and messengers',
            'type': 'Line Item',
            'sort': 656,
            'displayLevel': 3,
            'category': '43',
            'code': '5021'
        }, {
            'name': 'Dispatchers',
            'type': 'Summary',
            'sort': 657,
            'displayLevel': 3,
            'category': '43',
            'code': '5030'
        }, {
            'name': 'Public safety telecommunicators',
            'type': 'Line Item',
            'sort': 658,
            'displayLevel': 4,
            'category': '43',
            'code': '5031'
        }, {
            'name': 'Dispatchers, except police, fire, and ambulance',
            'type': 'Line Item',
            'sort': 659,
            'displayLevel': 4,
            'category': '43',
            'code': '5032'
        }, {
            'name': 'Meter readers, utilities',
            'type': 'Line Item',
            'sort': 660,
            'displayLevel': 3,
            'category': '43',
            'code': '5041'
        }, {
            'name': 'Postal service workers',
            'type': 'Summary',
            'sort': 661,
            'displayLevel': 3,
            'category': '43',
            'code': '5050'
        }, {
            'name': 'Postal service clerks',
            'type': 'Line Item',
            'sort': 662,
            'displayLevel': 4,
            'category': '43',
            'code': '5051'
        }, {
            'name': 'Postal service mail carriers',
            'type': 'Line Item',
            'sort': 663,
            'displayLevel': 4,
            'category': '43',
            'code': '5052'
        }, {
            'name': 'Postal service mail sorters, processors, and processing machine operators',
            'type': 'Line Item',
            'sort': 664,
            'displayLevel': 4,
            'category': '43',
            'code': '5053'
        }, {
            'name': 'Production, planning, and expediting clerks',
            'type': 'Line Item',
            'sort': 665,
            'displayLevel': 3,
            'category': '43',
            'code': '5061'
        }, {
            'name': 'Shipping, receiving, and inventory clerks',
            'type': 'Line Item',
            'sort': 666,
            'displayLevel': 3,
            'category': '43',
            'code': '5071'
        }, {
            'name': 'Weighers, measurers, checkers, and samplers, recordkeeping',
            'type': 'Line Item',
            'sort': 667,
            'displayLevel': 3,
            'category': '43',
            'code': '5111'
        }, {
            'name': 'Secretaries and administrative assistants',
            'type': 'Summary',
            'sort': 668,
            'displayLevel': 2,
            'category': '43',
            'code': '6000'
        }, {
            'name': 'Executive secretaries and executive administrative assistants',
            'type': 'Line Item',
            'sort': 669,
            'displayLevel': 3,
            'category': '43',
            'code': '6011'
        }, {
            'name': 'Legal secretaries and administrative assistants',
            'type': 'Line Item',
            'sort': 670,
            'displayLevel': 3,
            'category': '43',
            'code': '6012'
        }, {
            'name': 'Medical secretaries and administrative assistants',
            'type': 'Line Item',
            'sort': 671,
            'displayLevel': 3,
            'category': '43',
            'code': '6013'
        }, {
            'name': 'Secretaries and administrative assistants, except legal, medical, and executive',
            'type': 'Line Item',
            'sort': 672,
            'displayLevel': 3,
            'category': '43',
            'code': '6014'
        }, {
            'name': 'Other office and administrative support workers',
            'type': 'Summary',
            'sort': 673,
            'displayLevel': 2,
            'category': '43',
            'code': '9000'
        }, {
            'name': 'Data entry and information processing workers',
            'type': 'Summary',
            'sort': 674,
            'displayLevel': 3,
            'category': '43',
            'code': '9020'
        }, {
            'name': 'Data entry keyers',
            'type': 'Line Item',
            'sort': 675,
            'displayLevel': 4,
            'category': '43',
            'code': '9021'
        }, {
            'name': 'Word processors and typists',
            'type': 'Line Item',
            'sort': 676,
            'displayLevel': 4,
            'category': '43',
            'code': '9022'
        }, {
            'name': 'Desktop publishers',
            'type': 'Line Item',
            'sort': 677,
            'displayLevel': 3,
            'category': '43',
            'code': '9031'
        }, {
            'name': 'Insurance claims and policy processing clerks',
            'type': 'Line Item',
            'sort': 678,
            'displayLevel': 3,
            'category': '43',
            'code': '9041'
        }, {
            'name': 'Mail clerks and mail machine operators, except postal service',
            'type': 'Line Item',
            'sort': 679,
            'displayLevel': 3,
            'category': '43',
            'code': '9051'
        }, {
            'name': 'Office clerks, general',
            'type': 'Line Item',
            'sort': 680,
            'displayLevel': 3,
            'category': '43',
            'code': '9061'
        }, {
            'name': 'Office machine operators, except computer',
            'type': 'Line Item',
            'sort': 681,
            'displayLevel': 3,
            'category': '43',
            'code': '9071'
        }, {
            'name': 'Proofreaders and copy markers',
            'type': 'Line Item',
            'sort': 682,
            'displayLevel': 3,
            'category': '43',
            'code': '9081'
        }, {
            'name': 'Statistical assistants',
            'type': 'Line Item',
            'sort': 683,
            'displayLevel': 3,
            'category': '43',
            'code': '9111'
        }, {
            'name': 'Office and administrative support workers, all other',
            'type': 'Line Item',
            'sort': 684,
            'displayLevel': 3,
            'category': '43',
            'code': '9199'
        }]
    }, {
        'name': 'Farming, fishing, and forestry occupations',
        'type': 'Summary',
        'sort': 685,
        'displayLevel': 1,
        'code': '45',
        'children': [{
            'name': 'Supervisors of farming, fishing, and forestry workers',
            'type': 'Summary',
            'sort': 686,
            'displayLevel': 2,
            'category': '45',
            'code': '1000'
        }, {
            'name': 'First-line supervisors of farming, fishing, and forestry workers',
            'type': 'Line Item',
            'sort': 687,
            'displayLevel': 3,
            'category': '45',
            'code': '1011'
        }, {
            'name': 'Agricultural workers',
            'type': 'Summary',
            'sort': 688,
            'displayLevel': 2,
            'category': '45',
            'code': '2000'
        }, {
            'name': 'Agricultural inspectors',
            'type': 'Line Item',
            'sort': 689,
            'displayLevel': 3,
            'category': '45',
            'code': '2011'
        }, {
            'name': 'Animal breeders',
            'type': 'Line Item',
            'sort': 690,
            'displayLevel': 3,
            'category': '45',
            'code': '2021'
        }, {
            'name': 'Graders and sorters, agricultural products',
            'type': 'Line Item',
            'sort': 691,
            'displayLevel': 3,
            'category': '45',
            'code': '2041'
        }, {
            'name': 'Miscellaneous agricultural workers',
            'type': 'Summary',
            'sort': 692,
            'displayLevel': 3,
            'category': '45',
            'code': '2090'
        }, {
            'name': 'Agricultural equipment operators',
            'type': 'Line Item',
            'sort': 693,
            'displayLevel': 4,
            'category': '45',
            'code': '2091'
        }, {
            'name': 'Farmworkers and laborers, crop, nursery, and greenhouse',
            'type': 'Line Item',
            'sort': 694,
            'displayLevel': 4,
            'category': '45',
            'code': '2092'
        }, {
            'name': 'Farmworkers, farm, ranch, and aquacultural animals',
            'type': 'Line Item',
            'sort': 695,
            'displayLevel': 4,
            'category': '45',
            'code': '2093'
        }, {
            'name': 'Agricultural workers, all other',
            'type': 'Line Item',
            'sort': 696,
            'displayLevel': 4,
            'category': '45',
            'code': '2099'
        }, {
            'name': 'Fishing and hunting workers',
            'type': 'Summary',
            'sort': 697,
            'displayLevel': 2,
            'category': '45',
            'code': '3000'
        }, {
            'name': 'Fishing and hunting workers',
            'type': 'Line Item',
            'sort': 698,
            'displayLevel': 3,
            'category': '45',
            'code': '3031'
        }, {
            'name': 'Forest, conservation, and logging workers',
            'type': 'Summary',
            'sort': 699,
            'displayLevel': 2,
            'category': '45',
            'code': '4000'
        }, {
            'name': 'Forest and conservation workers',
            'type': 'Line Item',
            'sort': 700,
            'displayLevel': 3,
            'category': '45',
            'code': '4011'
        }, {
            'name': 'Logging workers',
            'type': 'Summary',
            'sort': 701,
            'displayLevel': 3,
            'category': '45',
            'code': '4020'
        }, {
            'name': 'Fallers',
            'type': 'Line Item',
            'sort': 702,
            'displayLevel': 4,
            'category': '45',
            'code': '4021'
        }, {
            'name': 'Logging equipment operators',
            'type': 'Line Item',
            'sort': 703,
            'displayLevel': 4,
            'category': '45',
            'code': '4022'
        }, {
            'name': 'Log graders and scalers',
            'type': 'Line Item',
            'sort': 704,
            'displayLevel': 4,
            'category': '45',
            'code': '4023'
        }, {
            'name': 'Logging workers, all other',
            'type': 'Line Item',
            'sort': 705,
            'displayLevel': 4,
            'category': '45',
            'code': '4029'
        }]
    }, {
        'name': 'Construction and extraction occupations',
        'type': 'Summary',
        'sort': 706,
        'displayLevel': 1,
        'code': '47',
        'children': [{
            'name': 'Supervisors of construction and extraction workers',
            'type': 'Summary',
            'sort': 707,
            'displayLevel': 2,
            'category': '47',
            'code': '1000'
        }, {
            'name': 'First-line supervisors of construction trades and extraction workers',
            'type': 'Line Item',
            'sort': 708,
            'displayLevel': 3,
            'category': '47',
            'code': '1011'
        }, {
            'name': 'Construction trades workers',
            'type': 'Summary',
            'sort': 709,
            'displayLevel': 2,
            'category': '47',
            'code': '2000'
        }, {
            'name': 'Boilermakers',
            'type': 'Line Item',
            'sort': 710,
            'displayLevel': 3,
            'category': '47',
            'code': '2011'
        }, {
            'name': 'Brickmasons, blockmasons, and stonemasons',
            'type': 'Summary',
            'sort': 711,
            'displayLevel': 3,
            'category': '47',
            'code': '2020'
        }, {
            'name': 'Brickmasons and blockmasons',
            'type': 'Line Item',
            'sort': 712,
            'displayLevel': 4,
            'category': '47',
            'code': '2021'
        }, {
            'name': 'Stonemasons',
            'type': 'Line Item',
            'sort': 713,
            'displayLevel': 4,
            'category': '47',
            'code': '2022'
        }, {
            'name': 'Carpenters',
            'type': 'Line Item',
            'sort': 714,
            'displayLevel': 3,
            'category': '47',
            'code': '2031'
        }, {
            'name': 'Carpet, floor, and tile installers and finishers',
            'type': 'Summary',
            'sort': 715,
            'displayLevel': 3,
            'category': '47',
            'code': '2040'
        }, {
            'name': 'Carpet installers',
            'type': 'Line Item',
            'sort': 716,
            'displayLevel': 4,
            'category': '47',
            'code': '2041'
        }, {
            'name': 'Floor layers, except carpet, wood, and hard tiles',
            'type': 'Line Item',
            'sort': 717,
            'displayLevel': 4,
            'category': '47',
            'code': '2042'
        }, {
            'name': 'Floor sanders and finishers',
            'type': 'Line Item',
            'sort': 718,
            'displayLevel': 4,
            'category': '47',
            'code': '2043'
        }, {
            'name': 'Tile and stone setters',
            'type': 'Line Item',
            'sort': 719,
            'displayLevel': 4,
            'category': '47',
            'code': '2044'
        }, {
            'name': 'Cement masons, concrete finishers, and terrazzo workers',
            'type': 'Summary',
            'sort': 720,
            'displayLevel': 3,
            'category': '47',
            'code': '2050'
        }, {
            'name': 'Cement masons and concrete finishers',
            'type': 'Line Item',
            'sort': 721,
            'displayLevel': 4,
            'category': '47',
            'code': '2051'
        }, {
            'name': 'Terrazzo workers and finishers',
            'type': 'Line Item',
            'sort': 722,
            'displayLevel': 4,
            'category': '47',
            'code': '2053'
        }, {
            'name': 'Construction laborers',
            'type': 'Line Item',
            'sort': 723,
            'displayLevel': 3,
            'category': '47',
            'code': '2061'
        }, {
            'name': 'Construction equipment operators',
            'type': 'Summary',
            'sort': 724,
            'displayLevel': 3,
            'category': '47',
            'code': '2070'
        }, {
            'name': 'Paving, surfacing, and tamping equipment operators',
            'type': 'Line Item',
            'sort': 725,
            'displayLevel': 4,
            'category': '47',
            'code': '2071'
        }, {
            'name': 'Pile driver operators',
            'type': 'Line Item',
            'sort': 726,
            'displayLevel': 4,
            'category': '47',
            'code': '2072'
        }, {
            'name': 'Operating engineers and other construction equipment operators',
            'type': 'Line Item',
            'sort': 727,
            'displayLevel': 4,
            'category': '47',
            'code': '2073'
        }, {
            'name': 'Drywall installers, ceiling tile installers, and tapers',
            'type': 'Summary',
            'sort': 728,
            'displayLevel': 3,
            'category': '47',
            'code': '2080'
        }, {
            'name': 'Drywall and ceiling tile installers',
            'type': 'Line Item',
            'sort': 729,
            'displayLevel': 4,
            'category': '47',
            'code': '2081'
        }, {
            'name': 'Tapers',
            'type': 'Line Item',
            'sort': 730,
            'displayLevel': 4,
            'category': '47',
            'code': '2082'
        }, {
            'name': 'Electricians',
            'type': 'Line Item',
            'sort': 731,
            'displayLevel': 3,
            'category': '47',
            'code': '2111'
        }, {
            'name': 'Glaziers',
            'type': 'Line Item',
            'sort': 732,
            'displayLevel': 3,
            'category': '47',
            'code': '2121'
        }, {
            'name': 'Insulation workers',
            'type': 'Summary',
            'sort': 733,
            'displayLevel': 3,
            'category': '47',
            'code': '2130'
        }, {
            'name': 'Insulation workers, floor, ceiling, and wall',
            'type': 'Line Item',
            'sort': 734,
            'displayLevel': 4,
            'category': '47',
            'code': '2131'
        }, {
            'name': 'Insulation workers, mechanical',
            'type': 'Line Item',
            'sort': 735,
            'displayLevel': 4,
            'category': '47',
            'code': '2132'
        }, {
            'name': 'Painters and paperhangers',
            'type': 'Summary',
            'sort': 736,
            'displayLevel': 3,
            'category': '47',
            'code': '2140'
        }, {
            'name': 'Painters, construction and maintenance',
            'type': 'Line Item',
            'sort': 737,
            'displayLevel': 4,
            'category': '47',
            'code': '2141'
        }, {
            'name': 'Paperhangers',
            'type': 'Line Item',
            'sort': 738,
            'displayLevel': 4,
            'category': '47',
            'code': '2142'
        }, {
            'name': 'Pipelayers, plumbers, pipefitters, and steamfitters',
            'type': 'Summary',
            'sort': 739,
            'displayLevel': 3,
            'category': '47',
            'code': '2150'
        }, {
            'name': 'Pipelayers',
            'type': 'Line Item',
            'sort': 740,
            'displayLevel': 4,
            'category': '47',
            'code': '2151'
        }, {
            'name': 'Plumbers, pipefitters, and steamfitters',
            'type': 'Line Item',
            'sort': 741,
            'displayLevel': 4,
            'category': '47',
            'code': '2152'
        }, {
            'name': 'Plasterers and stucco masons',
            'type': 'Line Item',
            'sort': 742,
            'displayLevel': 3,
            'category': '47',
            'code': '2161'
        }, {
            'name': 'Reinforcing iron and rebar workers',
            'type': 'Line Item',
            'sort': 743,
            'displayLevel': 3,
            'category': '47',
            'code': '2171'
        }, {
            'name': 'Roofers',
            'type': 'Line Item',
            'sort': 744,
            'displayLevel': 3,
            'category': '47',
            'code': '2181'
        }, {
            'name': 'Sheet metal workers',
            'type': 'Line Item',
            'sort': 745,
            'displayLevel': 3,
            'category': '47',
            'code': '2211'
        }, {
            'name': 'Structural iron and steel workers',
            'type': 'Line Item',
            'sort': 746,
            'displayLevel': 3,
            'category': '47',
            'code': '2221'
        }, {
            'name': 'Solar photovoltaic installers',
            'type': 'Line Item',
            'sort': 747,
            'displayLevel': 3,
            'category': '47',
            'code': '2231'
        }, {
            'name': 'Helpers, construction trades',
            'type': 'Summary',
            'sort': 748,
            'displayLevel': 2,
            'category': '47',
            'code': '3000'
        }, {
            'name': 'Helpers--brickmasons, blockmasons, stonemasons, and tile and marble setters',
            'type': 'Line Item',
            'sort': 749,
            'displayLevel': 3,
            'category': '47',
            'code': '3011'
        }, {
            'name': 'Helpers--carpenters',
            'type': 'Line Item',
            'sort': 750,
            'displayLevel': 3,
            'category': '47',
            'code': '3012'
        }, {
            'name': 'Helpers--electricians',
            'type': 'Line Item',
            'sort': 751,
            'displayLevel': 3,
            'category': '47',
            'code': '3013'
        }, {
            'name': 'Helpers--painters, paperhangers, plasterers, and stucco masons',
            'type': 'Line Item',
            'sort': 752,
            'displayLevel': 3,
            'category': '47',
            'code': '3014'
        }, {
            'name': 'Helpers--pipelayers, plumbers, pipefitters, and steamfitters',
            'type': 'Line Item',
            'sort': 753,
            'displayLevel': 3,
            'category': '47',
            'code': '3015'
        }, {
            'name': 'Helpers--roofers',
            'type': 'Line Item',
            'sort': 754,
            'displayLevel': 3,
            'category': '47',
            'code': '3016'
        }, {
            'name': 'Helpers, construction trades, all other',
            'type': 'Line Item',
            'sort': 755,
            'displayLevel': 3,
            'category': '47',
            'code': '3019'
        }, {
            'name': 'Other construction and related workers',
            'type': 'Summary',
            'sort': 756,
            'displayLevel': 2,
            'category': '47',
            'code': '4000'
        }, {
            'name': 'Construction and building inspectors',
            'type': 'Line Item',
            'sort': 757,
            'displayLevel': 3,
            'category': '47',
            'code': '4011'
        }, {
            'name': 'Elevator and escalator installers and repairers',
            'type': 'Line Item',
            'sort': 758,
            'displayLevel': 3,
            'category': '47',
            'code': '4021'
        }, {
            'name': 'Fence erectors',
            'type': 'Line Item',
            'sort': 759,
            'displayLevel': 3,
            'category': '47',
            'code': '4031'
        }, {
            'name': 'Hazardous materials removal workers',
            'type': 'Line Item',
            'sort': 760,
            'displayLevel': 3,
            'category': '47',
            'code': '4041'
        }, {
            'name': 'Highway maintenance workers',
            'type': 'Line Item',
            'sort': 761,
            'displayLevel': 3,
            'category': '47',
            'code': '4051'
        }, {
            'name': 'Rail-track laying and maintenance equipment operators',
            'type': 'Line Item',
            'sort': 762,
            'displayLevel': 3,
            'category': '47',
            'code': '4061'
        }, {
            'name': 'Septic tank servicers and sewer pipe cleaners',
            'type': 'Line Item',
            'sort': 763,
            'displayLevel': 3,
            'category': '47',
            'code': '4071'
        }, {
            'name': 'Miscellaneous construction and related workers',
            'type': 'Line Item',
            'sort': 764,
            'displayLevel': 3,
            'category': '47',
            'code': '4090'
        }, {
            'name': 'Extraction workers',
            'type': 'Summary',
            'sort': 765,
            'displayLevel': 2,
            'category': '47',
            'code': '5000'
        }, {
            'name': 'Derrick, rotary drill, and service unit operators, oil and gas',
            'type': 'Summary',
            'sort': 766,
            'displayLevel': 3,
            'category': '47',
            'code': '5010'
        }, {
            'name': 'Derrick operators, oil and gas',
            'type': 'Line Item',
            'sort': 767,
            'displayLevel': 4,
            'category': '47',
            'code': '5011'
        }, {
            'name': 'Rotary drill operators, oil and gas',
            'type': 'Line Item',
            'sort': 768,
            'displayLevel': 4,
            'category': '47',
            'code': '5012'
        }, {
            'name': 'Service unit operators, oil and gas',
            'type': 'Line Item',
            'sort': 769,
            'displayLevel': 4,
            'category': '47',
            'code': '5013'
        }, {
            'name': 'Excavating and loading machine and dragline operators, surface mining',
            'type': 'Line Item',
            'sort': 770,
            'displayLevel': 3,
            'category': '47',
            'code': '5022'
        }, {
            'name': 'Continuous mining machine operators',
            'type': 'Line Item',
            'sort': 771,
            'displayLevel': 3,
            'category': '47',
            'code': '5041'
        }, {
            'name': 'Roof bolters, mining',
            'type': 'Line Item',
            'sort': 772,
            'displayLevel': 3,
            'category': '47',
            'code': '5043'
        }, {
            'name': 'Loading and moving machine operators, underground mining',
            'type': 'Line Item',
            'sort': 773,
            'displayLevel': 3,
            'category': '47',
            'code': '5044'
        }, {
            'name': 'Rock splitters, quarry',
            'type': 'Line Item',
            'sort': 774,
            'displayLevel': 3,
            'category': '47',
            'code': '5051'
        }, {
            'name': 'Roustabouts, oil and gas',
            'type': 'Line Item',
            'sort': 775,
            'displayLevel': 3,
            'category': '47',
            'code': '5071'
        }, {
            'name': 'Helpers--extraction workers',
            'type': 'Line Item',
            'sort': 776,
            'displayLevel': 3,
            'category': '47',
            'code': '5081'
        }, {
            'name': 'Earth drillers, except oil and gas; and explosives workers, ordnance handling experts, and blasters',
            'type': 'Line Item',
            'sort': 777,
            'displayLevel': 3,
            'category': '47',
            'code': '5097'
        }, {
            'name': 'Underground mining machine operators and extraction workers, all other',
            'type': 'Line Item',
            'sort': 778,
            'displayLevel': 3,
            'category': '47',
            'code': '5098'
        }]
    }, {
        'name': 'Installation, maintenance, and repair occupations',
        'type': 'Summary',
        'sort': 779,
        'displayLevel': 1,
        'code': '49',
        'children': [{
            'name': 'Supervisors of installation, maintenance, and repair workers',
            'type': 'Summary',
            'sort': 780,
            'displayLevel': 2,
            'category': '49',
            'code': '1000'
        }, {
            'name': 'First-line supervisors of mechanics, installers, and repairers',
            'type': 'Line Item',
            'sort': 781,
            'displayLevel': 3,
            'category': '49',
            'code': '1011'
        }, {
            'name': 'Electrical and electronic equipment mechanics, installers, and repairers',
            'type': 'Summary',
            'sort': 782,
            'displayLevel': 2,
            'category': '49',
            'code': '2000'
        }, {
            'name': 'Computer, automated teller, and office machine repairers',
            'type': 'Line Item',
            'sort': 783,
            'displayLevel': 3,
            'category': '49',
            'code': '2011'
        }, {
            'name': 'Radio and telecommunications equipment installers and repairers',
            'type': 'Summary',
            'sort': 784,
            'displayLevel': 3,
            'category': '49',
            'code': '2020'
        }, {
            'name': 'Radio, cellular, and tower equipment installers and repairers',
            'type': 'Line Item',
            'sort': 785,
            'displayLevel': 4,
            'category': '49',
            'code': '2021'
        }, {
            'name': 'Telecommunications equipment installers and repairers, except line installers',
            'type': 'Line Item',
            'sort': 786,
            'displayLevel': 4,
            'category': '49',
            'code': '2022'
        }, {
            'name': 'Miscellaneous electrical and electronic equipment mechanics, installers, and repairers',
            'type': 'Summary',
            'sort': 787,
            'displayLevel': 3,
            'category': '49',
            'code': '2090'
        }, {
            'name': 'Avionics technicians',
            'type': 'Line Item',
            'sort': 788,
            'displayLevel': 4,
            'category': '49',
            'code': '2091'
        }, {
            'name': 'Electric motor, power tool, and related repairers',
            'type': 'Line Item',
            'sort': 789,
            'displayLevel': 4,
            'category': '49',
            'code': '2092'
        }, {
            'name': 'Electrical and electronics installers and repairers, transportation equipment',
            'type': 'Line Item',
            'sort': 790,
            'displayLevel': 4,
            'category': '49',
            'code': '2093'
        }, {
            'name': 'Electrical and electronics repairers, commercial and industrial equipment',
            'type': 'Line Item',
            'sort': 791,
            'displayLevel': 4,
            'category': '49',
            'code': '2094'
        }, {
            'name': 'Electrical and electronics repairers, powerhouse, substation, and relay',
            'type': 'Line Item',
            'sort': 792,
            'displayLevel': 4,
            'category': '49',
            'code': '2095'
        }, {
            'name': 'Electronic equipment installers and repairers, motor vehicles',
            'type': 'Line Item',
            'sort': 793,
            'displayLevel': 4,
            'category': '49',
            'code': '2096'
        }, {
            'name': 'Audiovisual equipment installers and repairers',
            'type': 'Line Item',
            'sort': 794,
            'displayLevel': 4,
            'category': '49',
            'code': '2097'
        }, {
            'name': 'Security and fire alarm systems installers',
            'type': 'Line Item',
            'sort': 795,
            'displayLevel': 4,
            'category': '49',
            'code': '2098'
        }, {
            'name': 'Vehicle and mobile equipment mechanics, installers, and repairers',
            'type': 'Summary',
            'sort': 796,
            'displayLevel': 2,
            'category': '49',
            'code': '3000'
        }, {
            'name': 'Aircraft mechanics and service technicians',
            'type': 'Line Item',
            'sort': 797,
            'displayLevel': 3,
            'category': '49',
            'code': '3011'
        }, {
            'name': 'Automotive technicians and repairers',
            'type': 'Summary',
            'sort': 798,
            'displayLevel': 3,
            'category': '49',
            'code': '3020'
        }, {
            'name': 'Automotive body and related repairers',
            'type': 'Line Item',
            'sort': 799,
            'displayLevel': 4,
            'category': '49',
            'code': '3021'
        }, {
            'name': 'Automotive glass installers and repairers',
            'type': 'Line Item',
            'sort': 800,
            'displayLevel': 4,
            'category': '49',
            'code': '3022'
        }, {
            'name': 'Automotive service technicians and mechanics',
            'type': 'Line Item',
            'sort': 801,
            'displayLevel': 4,
            'category': '49',
            'code': '3023'
        }, {
            'name': 'Bus and truck mechanics and diesel engine specialists',
            'type': 'Line Item',
            'sort': 802,
            'displayLevel': 3,
            'category': '49',
            'code': '3031'
        }, {
            'name': 'Heavy vehicle and mobile equipment service technicians and mechanics',
            'type': 'Summary',
            'sort': 803,
            'displayLevel': 3,
            'category': '49',
            'code': '3040'
        }, {
            'name': 'Farm equipment mechanics and service technicians',
            'type': 'Line Item',
            'sort': 804,
            'displayLevel': 4,
            'category': '49',
            'code': '3041'
        }, {
            'name': 'Mobile heavy equipment mechanics, except engines',
            'type': 'Line Item',
            'sort': 805,
            'displayLevel': 4,
            'category': '49',
            'code': '3042'
        }, {
            'name': 'Rail car repairers',
            'type': 'Line Item',
            'sort': 806,
            'displayLevel': 4,
            'category': '49',
            'code': '3043'
        }, {
            'name': 'Small engine mechanics',
            'type': 'Summary',
            'sort': 807,
            'displayLevel': 3,
            'category': '49',
            'code': '3050'
        }, {
            'name': 'Motorboat mechanics and service technicians',
            'type': 'Line Item',
            'sort': 808,
            'displayLevel': 4,
            'category': '49',
            'code': '3051'
        }, {
            'name': 'Motorcycle mechanics',
            'type': 'Line Item',
            'sort': 809,
            'displayLevel': 4,
            'category': '49',
            'code': '3052'
        }, {
            'name': 'Outdoor power equipment and other small engine mechanics',
            'type': 'Line Item',
            'sort': 810,
            'displayLevel': 4,
            'category': '49',
            'code': '3053'
        }, {
            'name': 'Miscellaneous vehicle and mobile equipment mechanics, installers, and repairers',
            'type': 'Summary',
            'sort': 811,
            'displayLevel': 3,
            'category': '49',
            'code': '3090'
        }, {
            'name': 'Bicycle repairers',
            'type': 'Line Item',
            'sort': 812,
            'displayLevel': 4,
            'category': '49',
            'code': '3091'
        }, {
            'name': 'Recreational vehicle service technicians',
            'type': 'Line Item',
            'sort': 813,
            'displayLevel': 4,
            'category': '49',
            'code': '3092'
        }, {
            'name': 'Tire repairers and changers',
            'type': 'Line Item',
            'sort': 814,
            'displayLevel': 4,
            'category': '49',
            'code': '3093'
        }, {
            'name': 'Other installation, maintenance, and repair occupations',
            'type': 'Summary',
            'sort': 815,
            'displayLevel': 2,
            'category': '49',
            'code': '9000'
        }, {
            'name': 'Control and valve installers and repairers',
            'type': 'Summary',
            'sort': 816,
            'displayLevel': 3,
            'category': '49',
            'code': '9010'
        }, {
            'name': 'Mechanical door repairers',
            'type': 'Line Item',
            'sort': 817,
            'displayLevel': 4,
            'category': '49',
            'code': '9011'
        }, {
            'name': 'Control and valve installers and repairers, except mechanical door',
            'type': 'Line Item',
            'sort': 818,
            'displayLevel': 4,
            'category': '49',
            'code': '9012'
        }, {
            'name': 'Heating, air conditioning, and refrigeration mechanics and installers',
            'type': 'Line Item',
            'sort': 819,
            'displayLevel': 3,
            'category': '49',
            'code': '9021'
        }, {
            'name': 'Home appliance repairers',
            'type': 'Line Item',
            'sort': 820,
            'displayLevel': 3,
            'category': '49',
            'code': '9031'
        }, {
            'name': 'Industrial machinery installation, repair, and maintenance workers',
            'type': 'Summary',
            'sort': 821,
            'displayLevel': 3,
            'category': '49',
            'code': '9040'
        }, {
            'name': 'Industrial machinery mechanics',
            'type': 'Line Item',
            'sort': 822,
            'displayLevel': 4,
            'category': '49',
            'code': '9041'
        }, {
            'name': 'Maintenance workers, machinery',
            'type': 'Line Item',
            'sort': 823,
            'displayLevel': 4,
            'category': '49',
            'code': '9043'
        }, {
            'name': 'Millwrights',
            'type': 'Line Item',
            'sort': 824,
            'displayLevel': 4,
            'category': '49',
            'code': '9044'
        }, {
            'name': 'Refractory materials repairers, except brickmasons',
            'type': 'Line Item',
            'sort': 825,
            'displayLevel': 4,
            'category': '49',
            'code': '9045'
        }, {
            'name': 'Line installers and repairers',
            'type': 'Summary',
            'sort': 826,
            'displayLevel': 3,
            'category': '49',
            'code': '9050'
        }, {
            'name': 'Electrical power-line installers and repairers',
            'type': 'Line Item',
            'sort': 827,
            'displayLevel': 4,
            'category': '49',
            'code': '9051'
        }, {
            'name': 'Telecommunications line installers and repairers',
            'type': 'Line Item',
            'sort': 828,
            'displayLevel': 4,
            'category': '49',
            'code': '9052'
        }, {
            'name': 'Precision instrument and equipment repairers',
            'type': 'Summary',
            'sort': 829,
            'displayLevel': 3,
            'category': '49',
            'code': '9060'
        }, {
            'name': 'Camera and photographic equipment repairers',
            'type': 'Line Item',
            'sort': 830,
            'displayLevel': 4,
            'category': '49',
            'code': '9061'
        }, {
            'name': 'Medical equipment repairers',
            'type': 'Line Item',
            'sort': 831,
            'displayLevel': 4,
            'category': '49',
            'code': '9062'
        }, {
            'name': 'Musical instrument repairers and tuners',
            'type': 'Line Item',
            'sort': 832,
            'displayLevel': 4,
            'category': '49',
            'code': '9063'
        }, {
            'name': 'Watch and clock repairers',
            'type': 'Line Item',
            'sort': 833,
            'displayLevel': 4,
            'category': '49',
            'code': '9064'
        }, {
            'name': 'Precision instrument and equipment repairers, all other',
            'type': 'Line Item',
            'sort': 834,
            'displayLevel': 4,
            'category': '49',
            'code': '9069'
        }, {
            'name': 'Maintenance and repair workers, general',
            'type': 'Line Item',
            'sort': 835,
            'displayLevel': 3,
            'category': '49',
            'code': '9071'
        }, {
            'name': 'Wind turbine service technicians',
            'type': 'Line Item',
            'sort': 836,
            'displayLevel': 3,
            'category': '49',
            'code': '9081'
        }, {
            'name': 'Miscellaneous installation, maintenance, and repair workers',
            'type': 'Summary',
            'sort': 837,
            'displayLevel': 3,
            'category': '49',
            'code': '9090'
        }, {
            'name': 'Coin, vending, and amusement machine servicers and repairers',
            'type': 'Line Item',
            'sort': 838,
            'displayLevel': 4,
            'category': '49',
            'code': '9091'
        }, {
            'name': 'Commercial divers',
            'type': 'Line Item',
            'sort': 839,
            'displayLevel': 4,
            'category': '49',
            'code': '9092'
        }, {
            'name': 'Locksmiths and safe repairers',
            'type': 'Line Item',
            'sort': 840,
            'displayLevel': 4,
            'category': '49',
            'code': '9094'
        }, {
            'name': 'Manufactured building and mobile home installers',
            'type': 'Line Item',
            'sort': 841,
            'displayLevel': 4,
            'category': '49',
            'code': '9095'
        }, {
            'name': 'Riggers',
            'type': 'Line Item',
            'sort': 842,
            'displayLevel': 4,
            'category': '49',
            'code': '9096'
        }, {
            'name': 'Signal and track switch repairers',
            'type': 'Line Item',
            'sort': 843,
            'displayLevel': 4,
            'category': '49',
            'code': '9097'
        }, {
            'name': 'Helpers--installation, maintenance, and repair workers',
            'type': 'Line Item',
            'sort': 844,
            'displayLevel': 4,
            'category': '49',
            'code': '9098'
        }, {
            'name': 'Installation, maintenance, and repair workers, all other',
            'type': 'Line Item',
            'sort': 845,
            'displayLevel': 4,
            'category': '49',
            'code': '9099'
        }]
    }, {
        'name': 'Production occupations',
        'type': 'Summary',
        'sort': 846,
        'displayLevel': 1,
        'code': '51',
        'children': [{
            'name': 'Supervisors of production workers',
            'type': 'Summary',
            'sort': 847,
            'displayLevel': 2,
            'category': '51',
            'code': '1000'
        }, {
            'name': 'First-line supervisors of production and operating workers',
            'type': 'Line Item',
            'sort': 848,
            'displayLevel': 3,
            'category': '51',
            'code': '1011'
        }, {
            'name': 'Assemblers and fabricators',
            'type': 'Summary',
            'sort': 849,
            'displayLevel': 2,
            'category': '51',
            'code': '2000'
        }, {
            'name': 'Aircraft structure, surfaces, rigging, and systems assemblers',
            'type': 'Line Item',
            'sort': 850,
            'displayLevel': 3,
            'category': '51',
            'code': '2011'
        }, {
            'name': 'Electrical, electronics, and electromechanical assemblers',
            'type': 'Summary',
            'sort': 851,
            'displayLevel': 3,
            'category': '51',
            'code': '2020'
        }, {
            'name': 'Coil winders, tapers, and finishers',
            'type': 'Line Item',
            'sort': 852,
            'displayLevel': 4,
            'category': '51',
            'code': '2021'
        }, {
            'name': 'Electrical, electronic, and electromechanical assemblers, except coil winders, tapers, and finishers',
            'type': 'Line Item',
            'sort': 853,
            'displayLevel': 4,
            'category': '51',
            'code': '2028'
        }, {
            'name': 'Engine and other machine assemblers',
            'type': 'Line Item',
            'sort': 854,
            'displayLevel': 3,
            'category': '51',
            'code': '2031'
        }, {
            'name': 'Structural metal fabricators and fitters',
            'type': 'Line Item',
            'sort': 855,
            'displayLevel': 3,
            'category': '51',
            'code': '2041'
        }, {
            'name': 'Fiberglass laminators and fabricators',
            'type': 'Line Item',
            'sort': 856,
            'displayLevel': 3,
            'category': '51',
            'code': '2051'
        }, {
            'name': 'Timing device assemblers and adjusters',
            'type': 'Line Item',
            'sort': 857,
            'displayLevel': 3,
            'category': '51',
            'code': '2061'
        }, {
            'name': 'Miscellaneous assemblers and fabricators',
            'type': 'Line Item',
            'sort': 858,
            'displayLevel': 3,
            'category': '51',
            'code': '2090'
        }, {
            'name': 'Food processing workers',
            'type': 'Summary',
            'sort': 859,
            'displayLevel': 2,
            'category': '51',
            'code': '3000'
        }, {
            'name': 'Bakers',
            'type': 'Line Item',
            'sort': 860,
            'displayLevel': 3,
            'category': '51',
            'code': '3011'
        }, {
            'name': 'Butchers and other meat, poultry, and fish processing workers',
            'type': 'Summary',
            'sort': 861,
            'displayLevel': 3,
            'category': '51',
            'code': '3020'
        }, {
            'name': 'Butchers and meat cutters',
            'type': 'Line Item',
            'sort': 862,
            'displayLevel': 4,
            'category': '51',
            'code': '3021'
        }, {
            'name': 'Meat, poultry, and fish cutters and trimmers',
            'type': 'Line Item',
            'sort': 863,
            'displayLevel': 4,
            'category': '51',
            'code': '3022'
        }, {
            'name': 'Slaughterers and meat packers',
            'type': 'Line Item',
            'sort': 864,
            'displayLevel': 4,
            'category': '51',
            'code': '3023'
        }, {
            'name': 'Miscellaneous food processing workers',
            'type': 'Summary',
            'sort': 865,
            'displayLevel': 3,
            'category': '51',
            'code': '3090'
        }, {
            'name': 'Food and tobacco roasting, baking, and drying machine operators and tenders',
            'type': 'Line Item',
            'sort': 866,
            'displayLevel': 4,
            'category': '51',
            'code': '3091'
        }, {
            'name': 'Food batchmakers',
            'type': 'Line Item',
            'sort': 867,
            'displayLevel': 4,
            'category': '51',
            'code': '3092'
        }, {
            'name': 'Food cooking machine operators and tenders',
            'type': 'Line Item',
            'sort': 868,
            'displayLevel': 4,
            'category': '51',
            'code': '3093'
        }, {
            'name': 'Food processing workers, all other',
            'type': 'Line Item',
            'sort': 869,
            'displayLevel': 4,
            'category': '51',
            'code': '3099'
        }, {
            'name': 'Metal workers and plastic workers',
            'type': 'Summary',
            'sort': 870,
            'displayLevel': 2,
            'category': '51',
            'code': '4000'
        }, {
            'name': 'Forming machine setters, operators, and tenders, metal and plastic',
            'type': 'Summary',
            'sort': 871,
            'displayLevel': 3,
            'category': '51',
            'code': '4020'
        }, {
            'name': 'Extruding and drawing machine setters, operators, and tenders, metal and plastic',
            'type': 'Line Item',
            'sort': 872,
            'displayLevel': 4,
            'category': '51',
            'code': '4021'
        }, {
            'name': 'Forging machine setters, operators, and tenders, metal and plastic',
            'type': 'Line Item',
            'sort': 873,
            'displayLevel': 4,
            'category': '51',
            'code': '4022'
        }, {
            'name': 'Rolling machine setters, operators, and tenders, metal and plastic',
            'type': 'Line Item',
            'sort': 874,
            'displayLevel': 4,
            'category': '51',
            'code': '4023'
        }, {
            'name': 'Machine tool cutting setters, operators, and tenders, metal and plastic',
            'type': 'Summary',
            'sort': 875,
            'displayLevel': 3,
            'category': '51',
            'code': '4030'
        }, {
            'name': 'Cutting, punching, and press machine setters, operators, and tenders, metal and plastic',
            'type': 'Line Item',
            'sort': 876,
            'displayLevel': 4,
            'category': '51',
            'code': '4031'
        }, {
            'name': 'Drilling and boring machine tool setters, operators, and tenders, metal and plastic',
            'type': 'Line Item',
            'sort': 877,
            'displayLevel': 4,
            'category': '51',
            'code': '4032'
        }, {
            'name': 'Grinding, lapping, polishing, and buffing machine tool setters, operators, and tenders, metal and plastic',
            'type': 'Line Item',
            'sort': 878,
            'displayLevel': 4,
            'category': '51',
            'code': '4033'
        }, {
            'name': 'Lathe and turning machine tool setters, operators, and tenders, metal and plastic',
            'type': 'Line Item',
            'sort': 879,
            'displayLevel': 4,
            'category': '51',
            'code': '4034'
        }, {
            'name': 'Milling and planing machine setters, operators, and tenders, metal and plastic',
            'type': 'Line Item',
            'sort': 880,
            'displayLevel': 4,
            'category': '51',
            'code': '4035'
        }, {
            'name': 'Machinists',
            'type': 'Line Item',
            'sort': 881,
            'displayLevel': 3,
            'category': '51',
            'code': '4041'
        }, {
            'name': 'Metal furnace operators, tenders, pourers, and casters',
            'type': 'Summary',
            'sort': 882,
            'displayLevel': 3,
            'category': '51',
            'code': '4050'
        }, {
            'name': 'Metal-refining furnace operators and tenders',
            'type': 'Line Item',
            'sort': 883,
            'displayLevel': 4,
            'category': '51',
            'code': '4051'
        }, {
            'name': 'Pourers and casters, metal',
            'type': 'Line Item',
            'sort': 884,
            'displayLevel': 4,
            'category': '51',
            'code': '4052'
        }, {
            'name': 'Model makers and patternmakers, metal and plastic',
            'type': 'Summary',
            'sort': 885,
            'displayLevel': 3,
            'category': '51',
            'code': '4060'
        }, {
            'name': 'Model makers, metal and plastic',
            'type': 'Line Item',
            'sort': 886,
            'displayLevel': 4,
            'category': '51',
            'code': '4061'
        }, {
            'name': 'Patternmakers, metal and plastic',
            'type': 'Line Item',
            'sort': 887,
            'displayLevel': 4,
            'category': '51',
            'code': '4062'
        }, {
            'name': 'Molders and molding machine setters, operators, and tenders, metal and plastic',
            'type': 'Summary',
            'sort': 888,
            'displayLevel': 3,
            'category': '51',
            'code': '4070'
        }, {
            'name': 'Foundry mold and coremakers',
            'type': 'Line Item',
            'sort': 889,
            'displayLevel': 4,
            'category': '51',
            'code': '4071'
        }, {
            'name': 'Molding, coremaking, and casting machine setters, operators, and tenders, metal and plastic',
            'type': 'Line Item',
            'sort': 890,
            'displayLevel': 4,
            'category': '51',
            'code': '4072'
        }, {
            'name': 'Multiple machine tool setters, operators, and tenders, metal and plastic',
            'type': 'Line Item',
            'sort': 891,
            'displayLevel': 3,
            'category': '51',
            'code': '4081'
        }, {
            'name': 'Tool and die makers',
            'type': 'Line Item',
            'sort': 892,
            'displayLevel': 3,
            'category': '51',
            'code': '4111'
        }, {
            'name': 'Welding, soldering, and brazing workers',
            'type': 'Summary',
            'sort': 893,
            'displayLevel': 3,
            'category': '51',
            'code': '4120'
        }, {
            'name': 'Welders, cutters, solderers, and brazers',
            'type': 'Line Item',
            'sort': 894,
            'displayLevel': 4,
            'category': '51',
            'code': '4121'
        }, {
            'name': 'Welding, soldering, and brazing machine setters, operators, and tenders',
            'type': 'Line Item',
            'sort': 895,
            'displayLevel': 4,
            'category': '51',
            'code': '4122'
        }, {
            'name': 'Miscellaneous metal workers and plastic workers',
            'type': 'Summary',
            'sort': 896,
            'displayLevel': 3,
            'category': '51',
            'code': '4190'
        }, {
            'name': 'Heat treating equipment setters, operators, and tenders, metal and plastic',
            'type': 'Line Item',
            'sort': 897,
            'displayLevel': 4,
            'category': '51',
            'code': '4191'
        }, {
            'name': 'Layout workers, metal and plastic',
            'type': 'Line Item',
            'sort': 898,
            'displayLevel': 4,
            'category': '51',
            'code': '4192'
        }, {
            'name': 'Plating machine setters, operators, and tenders, metal and plastic',
            'type': 'Line Item',
            'sort': 899,
            'displayLevel': 4,
            'category': '51',
            'code': '4193'
        }, {
            'name': 'Tool grinders, filers, and sharpeners',
            'type': 'Line Item',
            'sort': 900,
            'displayLevel': 4,
            'category': '51',
            'code': '4194'
        }, {
            'name': 'Metal workers and plastic workers, all other',
            'type': 'Line Item',
            'sort': 901,
            'displayLevel': 4,
            'category': '51',
            'code': '4199'
        }, {
            'name': 'Printing workers',
            'type': 'Summary',
            'sort': 902,
            'displayLevel': 2,
            'category': '51',
            'code': '5100'
        }, {
            'name': 'Prepress technicians and workers',
            'type': 'Line Item',
            'sort': 903,
            'displayLevel': 3,
            'category': '51',
            'code': '5111'
        }, {
            'name': 'Printing press operators',
            'type': 'Line Item',
            'sort': 904,
            'displayLevel': 3,
            'category': '51',
            'code': '5112'
        }, {
            'name': 'Print binding and finishing workers',
            'type': 'Line Item',
            'sort': 905,
            'displayLevel': 3,
            'category': '51',
            'code': '5113'
        }, {
            'name': 'Textile, apparel, and furnishings workers',
            'type': 'Summary',
            'sort': 906,
            'displayLevel': 2,
            'category': '51',
            'code': '6000'
        }, {
            'name': 'Laundry and dry-cleaning workers',
            'type': 'Line Item',
            'sort': 907,
            'displayLevel': 3,
            'category': '51',
            'code': '6011'
        }, {
            'name': 'Pressers, textile, garment, and related materials',
            'type': 'Line Item',
            'sort': 908,
            'displayLevel': 3,
            'category': '51',
            'code': '6021'
        }, {
            'name': 'Sewing machine operators',
            'type': 'Line Item',
            'sort': 909,
            'displayLevel': 3,
            'category': '51',
            'code': '6031'
        }, {
            'name': 'Shoe and leather workers',
            'type': 'Summary',
            'sort': 910,
            'displayLevel': 3,
            'category': '51',
            'code': '6040'
        }, {
            'name': 'Shoe and leather workers and repairers',
            'type': 'Line Item',
            'sort': 911,
            'displayLevel': 4,
            'category': '51',
            'code': '6041'
        }, {
            'name': 'Shoe machine operators and tenders',
            'type': 'Line Item',
            'sort': 912,
            'displayLevel': 4,
            'category': '51',
            'code': '6042'
        }, {
            'name': 'Tailors, dressmakers, and sewers',
            'type': 'Summary',
            'sort': 913,
            'displayLevel': 3,
            'category': '51',
            'code': '6050'
        }, {
            'name': 'Sewers, hand',
            'type': 'Line Item',
            'sort': 914,
            'displayLevel': 4,
            'category': '51',
            'code': '6051'
        }, {
            'name': 'Tailors, dressmakers, and custom sewers',
            'type': 'Line Item',
            'sort': 915,
            'displayLevel': 4,
            'category': '51',
            'code': '6052'
        }, {
            'name': 'Textile machine setters, operators, and tenders',
            'type': 'Summary',
            'sort': 916,
            'displayLevel': 3,
            'category': '51',
            'code': '6060'
        }, {
            'name': 'Textile bleaching and dyeing machine operators and tenders',
            'type': 'Line Item',
            'sort': 917,
            'displayLevel': 4,
            'category': '51',
            'code': '6061'
        }, {
            'name': 'Textile cutting machine setters, operators, and tenders',
            'type': 'Line Item',
            'sort': 918,
            'displayLevel': 4,
            'category': '51',
            'code': '6062'
        }, {
            'name': 'Textile knitting and weaving machine setters, operators, and tenders',
            'type': 'Line Item',
            'sort': 919,
            'displayLevel': 4,
            'category': '51',
            'code': '6063'
        }, {
            'name': 'Textile winding, twisting, and drawing out machine setters, operators, and tenders',
            'type': 'Line Item',
            'sort': 920,
            'displayLevel': 4,
            'category': '51',
            'code': '6064'
        }, {
            'name': 'Miscellaneous textile, apparel, and furnishings workers',
            'type': 'Summary',
            'sort': 921,
            'displayLevel': 3,
            'category': '51',
            'code': '6090'
        }, {
            'name': 'Extruding and forming machine setters, operators, and tenders, synthetic and glass fibers',
            'type': 'Line Item',
            'sort': 922,
            'displayLevel': 4,
            'category': '51',
            'code': '6091'
        }, {
            'name': 'Fabric and apparel patternmakers',
            'type': 'Line Item',
            'sort': 923,
            'displayLevel': 4,
            'category': '51',
            'code': '6092'
        }, {
            'name': 'Upholsterers',
            'type': 'Line Item',
            'sort': 924,
            'displayLevel': 4,
            'category': '51',
            'code': '6093'
        }, {
            'name': 'Textile, apparel, and furnishings workers, all other',
            'type': 'Line Item',
            'sort': 925,
            'displayLevel': 4,
            'category': '51',
            'code': '6099'
        }, {
            'name': 'Woodworkers',
            'type': 'Summary',
            'sort': 926,
            'displayLevel': 2,
            'category': '51',
            'code': '7000'
        }, {
            'name': 'Cabinetmakers and bench carpenters',
            'type': 'Line Item',
            'sort': 927,
            'displayLevel': 3,
            'category': '51',
            'code': '7011'
        }, {
            'name': 'Furniture finishers',
            'type': 'Line Item',
            'sort': 928,
            'displayLevel': 3,
            'category': '51',
            'code': '7021'
        }, {
            'name': 'Model makers and patternmakers, wood',
            'type': 'Summary',
            'sort': 929,
            'displayLevel': 3,
            'category': '51',
            'code': '7030'
        }, {
            'name': 'Model makers, wood',
            'type': 'Line Item',
            'sort': 930,
            'displayLevel': 4,
            'category': '51',
            'code': '7031'
        }, {
            'name': 'Patternmakers, wood',
            'type': 'Line Item',
            'sort': 931,
            'displayLevel': 4,
            'category': '51',
            'code': '7032'
        }, {
            'name': 'Woodworking machine setters, operators, and tenders',
            'type': 'Summary',
            'sort': 932,
            'displayLevel': 3,
            'category': '51',
            'code': '7040'
        }, {
            'name': 'Sawing machine setters, operators, and tenders, wood',
            'type': 'Line Item',
            'sort': 933,
            'displayLevel': 4,
            'category': '51',
            'code': '7041'
        }, {
            'name': 'Woodworking machine setters, operators, and tenders, except sawing',
            'type': 'Line Item',
            'sort': 934,
            'displayLevel': 4,
            'category': '51',
            'code': '7042'
        }, {
            'name': 'Woodworkers, all other',
            'type': 'Line Item',
            'sort': 935,
            'displayLevel': 3,
            'category': '51',
            'code': '7099'
        }, {
            'name': 'Plant and system operators',
            'type': 'Summary',
            'sort': 936,
            'displayLevel': 2,
            'category': '51',
            'code': '8000'
        }, {
            'name': 'Power plant operators, distributors, and dispatchers',
            'type': 'Summary',
            'sort': 937,
            'displayLevel': 3,
            'category': '51',
            'code': '8010'
        }, {
            'name': 'Nuclear power reactor operators',
            'type': 'Line Item',
            'sort': 938,
            'displayLevel': 4,
            'category': '51',
            'code': '8011'
        }, {
            'name': 'Power distributors and dispatchers',
            'type': 'Line Item',
            'sort': 939,
            'displayLevel': 4,
            'category': '51',
            'code': '8012'
        }, {
            'name': 'Power plant operators',
            'type': 'Line Item',
            'sort': 940,
            'displayLevel': 4,
            'category': '51',
            'code': '8013'
        }, {
            'name': 'Stationary engineers and boiler operators',
            'type': 'Line Item',
            'sort': 941,
            'displayLevel': 3,
            'category': '51',
            'code': '8021'
        }, {
            'name': 'Water and wastewater treatment plant and system operators',
            'type': 'Line Item',
            'sort': 942,
            'displayLevel': 3,
            'category': '51',
            'code': '8031'
        }, {
            'name': 'Miscellaneous plant and system operators',
            'type': 'Summary',
            'sort': 943,
            'displayLevel': 3,
            'category': '51',
            'code': '8090'
        }, {
            'name': 'Chemical plant and system operators',
            'type': 'Line Item',
            'sort': 944,
            'displayLevel': 4,
            'category': '51',
            'code': '8091'
        }, {
            'name': 'Gas plant operators',
            'type': 'Line Item',
            'sort': 945,
            'displayLevel': 4,
            'category': '51',
            'code': '8092'
        }, {
            'name': 'Petroleum pump system operators, refinery operators, and gaugers',
            'type': 'Line Item',
            'sort': 946,
            'displayLevel': 4,
            'category': '51',
            'code': '8093'
        }, {
            'name': 'Plant and system operators, all other',
            'type': 'Line Item',
            'sort': 947,
            'displayLevel': 4,
            'category': '51',
            'code': '8099'
        }, {
            'name': 'Other production occupations',
            'type': 'Summary',
            'sort': 948,
            'displayLevel': 2,
            'category': '51',
            'code': '9000'
        }, {
            'name': 'Chemical processing machine setters, operators, and tenders',
            'type': 'Summary',
            'sort': 949,
            'displayLevel': 3,
            'category': '51',
            'code': '9010'
        }, {
            'name': 'Chemical equipment operators and tenders',
            'type': 'Line Item',
            'sort': 950,
            'displayLevel': 4,
            'category': '51',
            'code': '9011'
        }, {
            'name': 'Separating, filtering, clarifying, precipitating, and still machine setters, operators, and tenders',
            'type': 'Line Item',
            'sort': 951,
            'displayLevel': 4,
            'category': '51',
            'code': '9012'
        }, {
            'name': 'Crushing, grinding, polishing, mixing, and blending workers',
            'type': 'Summary',
            'sort': 952,
            'displayLevel': 3,
            'category': '51',
            'code': '9020'
        }, {
            'name': 'Crushing, grinding, and polishing machine setters, operators, and tenders',
            'type': 'Line Item',
            'sort': 953,
            'displayLevel': 4,
            'category': '51',
            'code': '9021'
        }, {
            'name': 'Grinding and polishing workers, hand',
            'type': 'Line Item',
            'sort': 954,
            'displayLevel': 4,
            'category': '51',
            'code': '9022'
        }, {
            'name': 'Mixing and blending machine setters, operators, and tenders',
            'type': 'Line Item',
            'sort': 955,
            'displayLevel': 4,
            'category': '51',
            'code': '9023'
        }, {
            'name': 'Cutting workers',
            'type': 'Summary',
            'sort': 956,
            'displayLevel': 3,
            'category': '51',
            'code': '9030'
        }, {
            'name': 'Cutters and trimmers, hand',
            'type': 'Line Item',
            'sort': 957,
            'displayLevel': 4,
            'category': '51',
            'code': '9031'
        }, {
            'name': 'Cutting and slicing machine setters, operators, and tenders',
            'type': 'Line Item',
            'sort': 958,
            'displayLevel': 4,
            'category': '51',
            'code': '9032'
        }, {
            'name': 'Extruding, forming, pressing, and compacting machine setters, operators, and tenders',
            'type': 'Line Item',
            'sort': 959,
            'displayLevel': 3,
            'category': '51',
            'code': '9041'
        }, {
            'name': 'Furnace, kiln, oven, drier, and kettle operators and tenders',
            'type': 'Line Item',
            'sort': 960,
            'displayLevel': 3,
            'category': '51',
            'code': '9051'
        }, {
            'name': 'Inspectors, testers, sorters, samplers, and weighers',
            'type': 'Line Item',
            'sort': 961,
            'displayLevel': 3,
            'category': '51',
            'code': '9061'
        }, {
            'name': 'Jewelers and precious stone and metal workers',
            'type': 'Line Item',
            'sort': 962,
            'displayLevel': 3,
            'category': '51',
            'code': '9071'
        }, {
            'name': 'Dental and ophthalmic laboratory technicians and medical appliance technicians',
            'type': 'Summary',
            'sort': 963,
            'displayLevel': 3,
            'category': '51',
            'code': '9080'
        }, {
            'name': 'Dental laboratory technicians',
            'type': 'Line Item',
            'sort': 964,
            'displayLevel': 4,
            'category': '51',
            'code': '9081'
        }, {
            'name': 'Medical appliance technicians',
            'type': 'Line Item',
            'sort': 965,
            'displayLevel': 4,
            'category': '51',
            'code': '9082'
        }, {
            'name': 'Ophthalmic laboratory technicians',
            'type': 'Line Item',
            'sort': 966,
            'displayLevel': 4,
            'category': '51',
            'code': '9083'
        }, {
            'name': 'Packaging and filling machine operators and tenders',
            'type': 'Line Item',
            'sort': 967,
            'displayLevel': 3,
            'category': '51',
            'code': '9111'
        }, {
            'name': 'Painting workers',
            'type': 'Summary',
            'sort': 968,
            'displayLevel': 3,
            'category': '51',
            'code': '9120'
        }, {
            'name': 'Painting, coating, and decorating workers',
            'type': 'Line Item',
            'sort': 969,
            'displayLevel': 4,
            'category': '51',
            'code': '9123'
        }, {
            'name': 'Coating, painting, and spraying machine setters, operators, and tenders',
            'type': 'Line Item',
            'sort': 970,
            'displayLevel': 4,
            'category': '51',
            'code': '9124'
        }, {
            'name': 'Semiconductor processing technicians',
            'type': 'Line Item',
            'sort': 971,
            'displayLevel': 3,
            'category': '51',
            'code': '9141'
        }, {
            'name': 'Photographic process workers and processing machine operators',
            'type': 'Line Item',
            'sort': 972,
            'displayLevel': 3,
            'category': '51',
            'code': '9151'
        }, {
            'name': 'Computer numerically controlled tool operators and programmers',
            'type': 'Summary',
            'sort': 973,
            'displayLevel': 3,
            'category': '51',
            'code': '9160'
        }, {
            'name': 'Computer numerically controlled tool operators',
            'type': 'Line Item',
            'sort': 974,
            'displayLevel': 4,
            'category': '51',
            'code': '9161'
        }, {
            'name': 'Computer numerically controlled tool programmers',
            'type': 'Line Item',
            'sort': 975,
            'displayLevel': 4,
            'category': '51',
            'code': '9162'
        }, {
            'name': 'Miscellaneous production workers',
            'type': 'Summary',
            'sort': 976,
            'displayLevel': 3,
            'category': '51',
            'code': '9190'
        }, {
            'name': 'Adhesive bonding machine operators and tenders',
            'type': 'Line Item',
            'sort': 977,
            'displayLevel': 4,
            'category': '51',
            'code': '9191'
        }, {
            'name': 'Cleaning, washing, and metal pickling equipment operators and tenders',
            'type': 'Line Item',
            'sort': 978,
            'displayLevel': 4,
            'category': '51',
            'code': '9192'
        }, {
            'name': 'Cooling and freezing equipment operators and tenders',
            'type': 'Line Item',
            'sort': 979,
            'displayLevel': 4,
            'category': '51',
            'code': '9193'
        }, {
            'name': 'Etchers and engravers',
            'type': 'Line Item',
            'sort': 980,
            'displayLevel': 4,
            'category': '51',
            'code': '9194'
        }, {
            'name': 'Molders, shapers, and casters, except metal and plastic',
            'type': 'Line Item',
            'sort': 981,
            'displayLevel': 4,
            'category': '51',
            'code': '9195'
        }, {
            'name': 'Paper goods machine setters, operators, and tenders',
            'type': 'Line Item',
            'sort': 982,
            'displayLevel': 4,
            'category': '51',
            'code': '9196'
        }, {
            'name': 'Tire builders',
            'type': 'Line Item',
            'sort': 983,
            'displayLevel': 4,
            'category': '51',
            'code': '9197'
        }, {
            'name': 'Helpers--production workers',
            'type': 'Line Item',
            'sort': 984,
            'displayLevel': 4,
            'category': '51',
            'code': '9198'
        }, {
            'name': 'Production workers, all other',
            'type': 'Line Item',
            'sort': 985,
            'displayLevel': 4,
            'category': '51',
            'code': '9199'
        }]
    }, {
        'name': 'Transportation and material moving occupations',
        'type': 'Summary',
        'sort': 986,
        'displayLevel': 1,
        'code': '53',
        'children': [{
            'name': 'Supervisors of transportation and material moving workers',
            'type': 'Summary',
            'sort': 987,
            'displayLevel': 2,
            'category': '53',
            'code': '1000'
        }, {
            'name': 'Aircraft cargo handling supervisors',
            'type': 'Line Item',
            'sort': 988,
            'displayLevel': 3,
            'category': '53',
            'code': '1041'
        }, {
            'name': 'First-line supervisors of transportation and material-moving workers, except aircraft cargo handling supervisors',
            'type': 'Line Item',
            'sort': 989,
            'displayLevel': 3,
            'category': '53',
            'code': '1047'
        }, {
            'name': 'Air transportation workers',
            'type': 'Summary',
            'sort': 990,
            'displayLevel': 2,
            'category': '53',
            'code': '2000'
        }, {
            'name': 'Aircraft pilots and flight engineers',
            'type': 'Summary',
            'sort': 991,
            'displayLevel': 3,
            'category': '53',
            'code': '2010'
        }, {
            'name': 'Airline pilots, copilots, and flight engineers',
            'type': 'Line Item',
            'sort': 992,
            'displayLevel': 4,
            'category': '53',
            'code': '2011'
        }, {
            'name': 'Commercial pilots',
            'type': 'Line Item',
            'sort': 993,
            'displayLevel': 4,
            'category': '53',
            'code': '2012'
        }, {
            'name': 'Air traffic controllers and airfield operations specialists',
            'type': 'Summary',
            'sort': 994,
            'displayLevel': 3,
            'category': '53',
            'code': '2020'
        }, {
            'name': 'Air traffic controllers',
            'type': 'Line Item',
            'sort': 995,
            'displayLevel': 4,
            'category': '53',
            'code': '2021'
        }, {
            'name': 'Airfield operations specialists',
            'type': 'Line Item',
            'sort': 996,
            'displayLevel': 4,
            'category': '53',
            'code': '2022'
        }, {
            'name': 'Flight attendants',
            'type': 'Line Item',
            'sort': 997,
            'displayLevel': 3,
            'category': '53',
            'code': '2031'
        }, {
            'name': 'Motor vehicle operators',
            'type': 'Summary',
            'sort': 998,
            'displayLevel': 2,
            'category': '53',
            'code': '3000'
        }, {
            'name': 'Ambulance drivers and attendants, except emergency medical technicians',
            'type': 'Line Item',
            'sort': 999,
            'displayLevel': 3,
            'category': '53',
            'code': '3011'
        }, {
            'name': 'Driver/sales workers and truck drivers',
            'type': 'Summary',
            'sort': 1000,
            'displayLevel': 3,
            'category': '53',
            'code': '3030'
        }, {
            'name': 'Driver/sales workers',
            'type': 'Line Item',
            'sort': 1001,
            'displayLevel': 4,
            'category': '53',
            'code': '3031'
        }, {
            'name': 'Heavy and tractor-trailer truck drivers',
            'type': 'Line Item',
            'sort': 1002,
            'displayLevel': 4,
            'category': '53',
            'code': '3032'
        }, {
            'name': 'Light truck drivers',
            'type': 'Line Item',
            'sort': 1003,
            'displayLevel': 4,
            'category': '53',
            'code': '3033'
        }, {
            'name': 'Passenger vehicle drivers',
            'type': 'Summary',
            'sort': 1004,
            'displayLevel': 3,
            'category': '53',
            'code': '3050'
        }, {
            'name': 'Bus drivers, transit and intercity',
            'type': 'Line Item',
            'sort': 1005,
            'displayLevel': 4,
            'category': '53',
            'code': '3052'
        }, {
            'name': 'Passenger vehicle drivers, except bus drivers, transit and intercity',
            'type': 'Line Item',
            'sort': 1006,
            'displayLevel': 4,
            'category': '53',
            'code': '3058'
        }, {
            'name': 'Motor vehicle operators, all other',
            'type': 'Line Item',
            'sort': 1007,
            'displayLevel': 3,
            'category': '53',
            'code': '3099'
        }, {
            'name': 'Rail transportation workers',
            'type': 'Summary',
            'sort': 1008,
            'displayLevel': 2,
            'category': '53',
            'code': '4000'
        }, {
            'name': 'Locomotive engineers and operators',
            'type': 'Summary',
            'sort': 1009,
            'displayLevel': 3,
            'category': '53',
            'code': '4010'
        }, {
            'name': 'Locomotive engineers',
            'type': 'Line Item',
            'sort': 1010,
            'displayLevel': 4,
            'category': '53',
            'code': '4011'
        }, {
            'name': 'Rail yard engineers, dinkey operators, and hostlers',
            'type': 'Line Item',
            'sort': 1011,
            'displayLevel': 4,
            'category': '53',
            'code': '4013'
        }, {
            'name': 'Railroad brake, signal, and switch operators and locomotive firers',
            'type': 'Line Item',
            'sort': 1012,
            'displayLevel': 3,
            'category': '53',
            'code': '4022'
        }, {
            'name': 'Railroad conductors and yardmasters',
            'type': 'Line Item',
            'sort': 1013,
            'displayLevel': 3,
            'category': '53',
            'code': '4031'
        }, {
            'name': 'Subway and streetcar operators',
            'type': 'Line Item',
            'sort': 1014,
            'displayLevel': 3,
            'category': '53',
            'code': '4041'
        }, {
            'name': 'Rail transportation workers, all other',
            'type': 'Line Item',
            'sort': 1015,
            'displayLevel': 3,
            'category': '53',
            'code': '4099'
        }, {
            'name': 'Water transportation workers',
            'type': 'Summary',
            'sort': 1016,
            'displayLevel': 2,
            'category': '53',
            'code': '5000'
        }, {
            'name': 'Sailors and marine oilers',
            'type': 'Line Item',
            'sort': 1017,
            'displayLevel': 3,
            'category': '53',
            'code': '5011'
        }, {
            'name': 'Ship and boat captains and operators',
            'type': 'Summary',
            'sort': 1018,
            'displayLevel': 3,
            'category': '53',
            'code': '5020'
        }, {
            'name': 'Captains, mates, and pilots of water vessels',
            'type': 'Line Item',
            'sort': 1019,
            'displayLevel': 4,
            'category': '53',
            'code': '5021'
        }, {
            'name': 'Motorboat operators',
            'type': 'Line Item',
            'sort': 1020,
            'displayLevel': 4,
            'category': '53',
            'code': '5022'
        }, {
            'name': 'Ship engineers',
            'type': 'Line Item',
            'sort': 1021,
            'displayLevel': 3,
            'category': '53',
            'code': '5031'
        }, {
            'name': 'Other transportation workers',
            'type': 'Summary',
            'sort': 1022,
            'displayLevel': 2,
            'category': '53',
            'code': '6000'
        }, {
            'name': 'Bridge and lock tenders',
            'type': 'Line Item',
            'sort': 1023,
            'displayLevel': 3,
            'category': '53',
            'code': '6011'
        }, {
            'name': 'Parking attendants',
            'type': 'Line Item',
            'sort': 1024,
            'displayLevel': 3,
            'category': '53',
            'code': '6021'
        }, {
            'name': 'Automotive and watercraft service attendants',
            'type': 'Line Item',
            'sort': 1025,
            'displayLevel': 3,
            'category': '53',
            'code': '6031'
        }, {
            'name': 'Traffic technicians',
            'type': 'Line Item',
            'sort': 1026,
            'displayLevel': 3,
            'category': '53',
            'code': '6041'
        }, {
            'name': 'Transportation inspectors',
            'type': 'Line Item',
            'sort': 1027,
            'displayLevel': 3,
            'category': '53',
            'code': '6051'
        }, {
            'name': 'Passenger attendants',
            'type': 'Line Item',
            'sort': 1028,
            'displayLevel': 3,
            'category': '53',
            'code': '6061'
        }, {
            'name': 'Aircraft service attendants and transportation workers, all other',
            'type': 'Line Item',
            'sort': 1029,
            'displayLevel': 3,
            'category': '53',
            'code': '6098'
        }, {
            'name': 'Material moving workers',
            'type': 'Summary',
            'sort': 1030,
            'displayLevel': 2,
            'category': '53',
            'code': '7000'
        }, {
            'name': 'Conveyor operators and tenders',
            'type': 'Line Item',
            'sort': 1031,
            'displayLevel': 3,
            'category': '53',
            'code': '7011'
        }, {
            'name': 'Crane and tower operators',
            'type': 'Line Item',
            'sort': 1032,
            'displayLevel': 3,
            'category': '53',
            'code': '7021'
        }, {
            'name': 'Dredge operators',
            'type': 'Line Item',
            'sort': 1033,
            'displayLevel': 3,
            'category': '53',
            'code': '7031'
        }, {
            'name': 'Hoist and winch operators',
            'type': 'Line Item',
            'sort': 1034,
            'displayLevel': 3,
            'category': '53',
            'code': '7041'
        }, {
            'name': 'Industrial truck and tractor operators',
            'type': 'Line Item',
            'sort': 1035,
            'displayLevel': 3,
            'category': '53',
            'code': '7051'
        }, {
            'name': 'Laborers and material movers',
            'type': 'Summary',
            'sort': 1036,
            'displayLevel': 3,
            'category': '53',
            'code': '7060'
        }, {
            'name': 'Cleaners of vehicles and equipment',
            'type': 'Line Item',
            'sort': 1037,
            'displayLevel': 4,
            'category': '53',
            'code': '7061'
        }, {
            'name': 'Laborers and freight, stock, and material movers, hand',
            'type': 'Line Item',
            'sort': 1038,
            'displayLevel': 4,
            'category': '53',
            'code': '7062'
        }, {
            'name': 'Machine feeders and offbearers',
            'type': 'Line Item',
            'sort': 1039,
            'displayLevel': 4,
            'category': '53',
            'code': '7063'
        }, {
            'name': 'Packers and packagers, hand',
            'type': 'Line Item',
            'sort': 1040,
            'displayLevel': 4,
            'category': '53',
            'code': '7064'
        }, {
            'name': 'Stockers and order fillers',
            'type': 'Line Item',
            'sort': 1041,
            'displayLevel': 4,
            'category': '53',
            'code': '7065'
        }, {
            'name': 'Pumping station operators',
            'type': 'Summary',
            'sort': 1042,
            'displayLevel': 3,
            'category': '53',
            'code': '7070'
        }, {
            'name': 'Gas compressor and gas pumping station operators',
            'type': 'Line Item',
            'sort': 1043,
            'displayLevel': 4,
            'category': '53',
            'code': '7071'
        }, {
            'name': 'Pump operators, except wellhead pumpers',
            'type': 'Line Item',
            'sort': 1044,
            'displayLevel': 4,
            'category': '53',
            'code': '7072'
        }, {
            'name': 'Wellhead pumpers',
            'type': 'Line Item',
            'sort': 1045,
            'displayLevel': 4,
            'category': '53',
            'code': '7073'
        }, {
            'name': 'Refuse and recyclable material collectors',
            'type': 'Line Item',
            'sort': 1046,
            'displayLevel': 3,
            'category': '53',
            'code': '7081'
        }, {
            'name': 'Tank car, truck, and ship loaders',
            'type': 'Line Item',
            'sort': 1047,
            'displayLevel': 3,
            'category': '53',
            'code': '7121'
        }, {
            'name': 'Material moving workers, all other',
            'type': 'Line Item',
            'sort': 1048,
            'displayLevel': 3,
            'category': '53',
            'code': '7199'
        }]
    }];
