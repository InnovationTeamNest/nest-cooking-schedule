export default interface IShift {
	group: {
		number: number;
		members: string[];
		color: string;
	};
	punishment: boolean;
	date: Date;
	when: 'lunch' | 'dinner';
}
