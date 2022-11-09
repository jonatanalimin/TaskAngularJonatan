export interface Freelancer {
    id: number,
    name: string,
    phone: string,
    skill: string,
    notes: string
}

export class FreelancerModel {
    constructor(
        public name: string,
        public phone: string,
        public skill: string,
        public notes: string
    ){}
}
