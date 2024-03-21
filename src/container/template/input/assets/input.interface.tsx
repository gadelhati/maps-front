export interface InputInterface {
    type: string,
	name: string,
	value: string | number | boolean | string[] | number[],
	readOnly: boolean,
	show: boolean,
	childToParent?: any,
}

export interface InputInterfaceString extends InputInterface {
	value: string,
}

export interface InputInterfaceNumber extends InputInterface {
	value: number,
}

export interface InputInterfaceBoolean extends InputInterface {
	value: boolean,
}