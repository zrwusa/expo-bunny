import {firebase} from '../firebase';

export const occupationCategories = [
    {
        'name': 'Total, all occupations',
        'type': 'Summary',
        'sort': null,
        'displayLevel': 0,
        'code': '00'
    },
    {
        'name': 'Management occupations',
        'type': 'Summary',
        'sort': 2,
        'displayLevel': 1,
        'code': '11'
    },
    {
        'name': 'Business and financial operations occupations',
        'type': 'Summary',
        'sort': 43,
        'displayLevel': 1,
        'code': '13'
    },
    {
        'name': 'Computer and mathematical occupations',
        'type': 'Summary',
        'sort': 79,
        'displayLevel': 1,
        'code': '15'
    },
    {
        'name': 'Architecture and engineering occupations',
        'type': 'Summary',
        'sort': 103,
        'displayLevel': 1,
        'code': '17'
    },
    {
        'name': 'Life, physical, and social science occupations',
        'type': 'Summary',
        'sort': 148,
        'displayLevel': 1,
        'code': '19'
    },
    {
        'name': 'Community and social service occupations',
        'type': 'Summary',
        'sort': 210,
        'displayLevel': 1,
        'code': '21'
    },
    {
        'name': 'Legal occupations',
        'type': 'Summary',
        'sort': 233,
        'displayLevel': 1,
        'code': '23'
    },
    {
        'name': 'Educational instruction and library occupations',
        'type': 'Summary',
        'sort': 247,
        'displayLevel': 1,
        'code': '25'
    },
    {
        'name': 'Arts, design, entertainment, sports, and media occupations',
        'type': 'Summary',
        'sort': 332,
        'displayLevel': 1,
        'code': '27'
    },
    {
        'name': 'Healthcare practitioners and technical occupations',
        'type': 'Summary',
        'sort': 385,
        'displayLevel': 1,
        'code': '29'
    },
    {
        'name': 'Healthcare support occupations',
        'type': 'Summary',
        'sort': 449,
        'displayLevel': 1,
        'code': '31'
    },
    {
        'name': 'Protective service occupations',
        'type': 'Summary',
        'sort': 474,
        'displayLevel': 1,
        'code': '33'
    },
    {
        'name': 'Food preparation and serving related occupations',
        'type': 'Summary',
        'sort': 507,
        'displayLevel': 1,
        'code': '35'
    },
    {
        'name': 'Building and grounds cleaning and maintenance occupations',
        'type': 'Summary',
        'sort': 530,
        'displayLevel': 1,
        'code': '37'
    },
    {
        'name': 'Personal care and service occupations',
        'type': 'Summary',
        'sort': 545,
        'displayLevel': 1,
        'code': '39'
    },
    {
        'name': 'Sales and related occupations',
        'type': 'Summary',
        'sort': 587,
        'displayLevel': 1,
        'code': '41'
    },
    {
        'name': 'Office and administrative support occupations',
        'type': 'Summary',
        'sort': 620,
        'displayLevel': 1,
        'code': '43'
    },
    {
        'name': 'Farming, fishing, and forestry occupations',
        'type': 'Summary',
        'sort': 685,
        'displayLevel': 1,
        'code': '45'
    },
    {
        'name': 'Construction and extraction occupations',
        'type': 'Summary',
        'sort': 706,
        'displayLevel': 1,
        'code': '47'
    },
    {
        'name': 'Installation, maintenance, and repair occupations',
        'type': 'Summary',
        'sort': 779,
        'displayLevel': 1,
        'code': '49'
    },
    {
        'name': 'Production occupations',
        'type': 'Summary',
        'sort': 846,
        'displayLevel': 1,
        'code': '51'
    },
    {
        'name': 'Transportation and material moving occupations',
        'type': 'Summary',
        'sort': 986,
        'displayLevel': 1,
        'code': '53'
    }
]

export const migrateOccupationCategories = async () => {
    for (const occupationCategory of occupationCategories) {
        await firebase
            .firestore()
            .collection('occupationCategories')
            .doc(occupationCategory.code)
            .set(occupationCategory)
    }
}
