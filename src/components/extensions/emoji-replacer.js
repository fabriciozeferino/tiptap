import {mergeAttributes, Node, nodeInputRule} from '@tiptap/core'

export const INPUT_REGEX = /(?<!!)\[(.*?)]\((.*?)\)/g; // Regex tests: https://regex101.com/r/32f7so/1

const EmojiReplacer = Node.create({
	name: 'emojiReplacer',
	group: 'inline',
	inline: true,
	selectable: false,
	atom: true,
	addAttributes() {
		return {
			link: {
				default: null,
				parseHTML: (element) => element.children[0].getAttribute('alt'),
				renderHTML: (attributes) => {
					if (!attributes.emoji) {
						return {}
					}

					return attributes.emoji
				},
			},
		}
	},
	parseHTML() {
		return [{ tag: 'a[href]:not([href *= "javascript:" i])' }];
	},
	renderHTML({ HTMLAttributes }) {
		return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
		},
	renderText({ node }) {
		return node.attrs.emoji
	},
	addCommands() {
		return {
			insertEmoji: (emoji) => ({ tr, dispatch }) => {
				const node = this.type.create({ emoji })

				if (dispatch) {
					tr.replaceRangeWith(tr.selection.from, tr.selection.to, node)
				}

				return true
			},
		}
	},

	addKeyboardShortcuts() {
			return {
					Backspace: () =>
							this.editor.commands.command(({ tr, state }) => {
									const { empty, anchor } = state.selection

									if (!empty) {
											return false
									}

									let isKeyboardEventHandled = false

									state.doc.nodesBetween(anchor - 1, anchor, (node, position) => {
											if (node.type.name === this.name) {
													tr.deleteRange(position, position + node.nodeSize)
													isKeyboardEventHandled = true

													return false
											}
									})

									return isKeyboardEventHandled
							}),
			}
	},
	addInputRules() {
		return [
			nodeInputRule({
				find: INPUT_REGEX,
				type: this.type,
				getAttributes: (match) => {
					console.log(INPUT_REGEX);
					return {
						emoji: match[1],
					}
				},
			})
		]
	},
})

export { EmojiReplacer }
