export function getActionDefinitions(self) {

	const actions = {}

	actions['send'] = {
		name: 'MENSAGEM',
		options: [
			{
				type: 'textinput',
				id: 'id_send',
				label: 'Mensagem:',
				tooltip: 'Use %hh to insert Hex codes\nObsolete, use Send HEX command instead',
				default: '',
				useVariables: true,
			},
		],
		callback: async (action) => {
			const cmd = unescape(await self.parseVariablesInString(action.options.id_send))

			if (cmd != '') {
				const sendBuf = Buffer.from(cmd, 'latin1')

				self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

				if (self.socket !== undefined && self.socket.isConnected) {
					self.socket.send(sendBuf)
				} else {
					self.log('debug', 'Socket not connected :(')
				}
			}
		},
	}
	actions['preset'] = {
		name: 'Preset',
		options: [
			{
				type: 'textinput',
				id: 'id_send',
				label: 'Mensagem:',
				tooltip: 'Use %hh to insert Hex codes\nObsolete, use Send HEX command instead',
				default: '',
				useVariables: true,
			},
		],
		callback: async (action) => {
			const cmd = unescape(await self.parseVariablesInString(action.options.id_send))

			if (cmd != '') {
				const sendBuf = Buffer.from(cmd, 'latin1')

				self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())

				if (self.socket !== undefined && self.socket.isConnected) {
					self.socket.send(sendBuf)
				} else {
					self.log('debug', 'Socket not connected :(')
				}
			}
		},
	}

	// Helper function to create simple command actions
	const createSimpleCommandAction = (name, command) => ({
		name: `${name}`,
		options: [],
		callback: async () => {
			const cmd = command
			const sendBuf = Buffer.from(cmd, 'latin1')

			self.log('debug', `sending to ${self.config.host}: ${sendBuf.toString()}`)

			if (self.socket !== undefined && self.socket.isConnected) {
				self.socket.send(sendBuf)
			} else {
				self.log('debug', 'Socket not connected :(')
			}
		},
	})

	// Creating simple command actions
	const simpleCommands = {
		ESC: 'esc',
		NEXT: 'next',
		PREVIOUS: 'previous',
		FECHAR_PPT: 'pptexit',
		FECHAR_VIDEO: 'videoexit',
		START: 'start',
		STOP: 'stop',
		SET: 'set',
		RESET: 'reset'

	}

	for (const [name, command] of Object.entries(simpleCommands)) {
		actions[name] = createSimpleCommandAction(name, command)
	}

	// Adicionando os comandos SET específicos
    const setCommands = {
        SET1: 'set1',
        SET5: 'set5',
        SET15: 'set15',
        SET30: 'set30',
        SET45: 'set45',
        SET60: 'set60',
		addMinute: 'addMinute',
		addFiveMinutes: 'addFiveMinutes',
		subtractMinute: 'subtractMinute',
		subtractFiveMinutes: 'subtractFiveMinutes',
		addHour: 'addHour',
		subtractHour: 'subtractHour',
		addMin: 'addMin',
		subtractMin: 'subtractMin',
		AA: 'AA',
		aa: 'aa'
    };

    for (const [name, command] of Object.entries(setCommands)) {
        actions[name] = createSimpleCommandAction(name, command);
    }


	return actions
}
