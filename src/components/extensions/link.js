import {mergeAttributes, Node, nodeInputRule, nodePasteRule} from '@tiptap/core';
// import { test as isLink } from 'linkifyjs';
import {VueNodeViewRenderer} from "@tiptap/vue-2";
import LinkNode from "@/components/extensions/LinkNode";

export const INPUT_REGEX = /(?<!!)\[(.*?)]\((.*?)\)/g; // Regex tests: https://regex101.com/r/32f7so/1

export const Link = Node.create({
	name: 'link',
	group: 'inline',
	inline: true,
	draggable: false,
	allowGapCursor: false,

	addNodeView() {
		return VueNodeViewRenderer(LinkNode, {
			extensions: this.editor.extensions,
			editable: this.editor.editable,
		})
	},

	addOptions() {
		return {
			HTMLAttributes: {
				target: '_blank',
				rel: 'noopener noreferrer nofollow',
				class: null
			},
		};
	},

	addAttributes() {
		return {
			href: {
				default: null
			},
			text: {
				default: null
			},
			target: {
				default: this.options.HTMLAttributes.target
			},
			class: {
				default: this.options.HTMLAttributes.class
			}
		};
	},

	parseHTML() {
		return [{ tag: 'a[href]:not([href *= "javascript:" i])' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), HTMLAttributes.text];
	},

	addCommands() {
		return {
			setLink: options => ({ commands }) => {
				console.log({commands})
				/*if (!isValidYoutubeUrl(options.src)) {
					return false
				}*/

				return commands.insertContent({
					type: this.name,
					attrs: options,
				})
			},
			unsetLink: () => (commands) => {
				// console.log({commands})

				//{href: thisNode.attrs.href, text: thisNode.attrs.text}
				// console.log(commands.node)

				commands.commands.command(({tr}) => {
					const attrs = {...tr.curSelection.node.attrs}

					let schema = commands.editor.schema;

					let node = schema.text(`[${attrs.text}](${attrs.text})`, [schema.nodes.text]);

					tr.replaceSelectionWith(node);

					return true;
				})
			}
		}
	},

	addInputRules() {
		return [
			nodeInputRule({
				type: this.type,
				find: (text) => {
					const matches = text.matchAll(INPUT_REGEX).next().value;
					// todo check if link is valid
					if (!matches) {
						return false;
					}

					return {
						index: text.search(INPUT_REGEX),
						text: text,
						replaceWith: matches[0],
						data: {
							href: matches[2],
							text: matches[1]
						},
					};
				},
				getAttributes: match => {
					return {
						href: match.data.href,
						text: match.data.text
					}
				}
			})
		];
	},

	addPasteRules() {
		return [
			nodePasteRule({
				type: this.type,
				find: INPUT_REGEX,
				getAttributes: match => {
					return {
						href: match[2],
						text: match[1]
					}
				},
			}),
		]
	},
});
