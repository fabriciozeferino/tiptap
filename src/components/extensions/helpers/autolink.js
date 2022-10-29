// import { combineTransactionSteps, findChildrenInRange, getChangedRanges } from '@tiptap/core';
// // import { find, test } from 'linkifyjs';
// import { Plugin, PluginKey } from 'prosemirror-state';
//
// export function autolink(options) {
// 	return new Plugin({
// 		key: new PluginKey('autolink'),
// 		appendTransaction: (transactions, oldState, newState) => {
// 			const docChanges = transactions.some(transaction => transaction.docChanged) && !oldState.doc.eq(newState.doc);
// 			const preventAutolink = transactions.some(transaction => transaction.getMeta('preventAutolink'));
//
// 			if (!docChanges || preventAutolink) {
// 				return;
// 			}
//
// 			const { tr } = newState;
// 			const transform = combineTransactionSteps(oldState.doc, [...transactions]);
// 			const { mapping } = transform;
// 			const changes = getChangedRanges(transform);
//
// 			changes.forEach(({ oldRange, newRange }) => {
// 				// at first, we check if we have to remove links
// 				// getMarksBetween(oldRange.from, oldRange.to, oldState.doc)
// 				// .filter(item => item.mark.type === options.type)
// 				// .forEach(oldMark => {
// 				// const newFrom = mapping.map(oldMark.from);
// 				// const newTo = mapping.map(oldMark.to);
// 				//
// 				// const newMarks = getMarksBetween(newFrom, newTo, newState.doc).filter(
// 				// item => item.mark.type === options.type
// 				// );
// 				//
// 				// if (!newMarks.length) {
// 				// return;
// 				// }
// 				//
// 				// const newMark = newMarks[0];
// 				// console.log('newMark', newMark);
// 				// const oldLinkText = oldState.doc.textBetween(oldMark.from, oldMark.to, undefined, ' ');
// 				// const newLinkText = newState.doc.textBetween(newMark.from, newMark.to, undefined, ' ');
// 				//
// 				// const wasLink = test(oldLinkText);
// 				// const isLink = test(newLinkText);
// 				//
// 				// console.log({ oldLinkText, newLinkText, wasLink, isLink });
// 				//
// 				// // remove only the link, if it was a link before too
// 				// // because we don’t want to remove links that were set manually
// 				// // if (wasLink && !isLink) {
// 				// tr.removeMark(newMark.from, newMark.to, options.type);
// 				// // }
// 				// });
//
// 				// Let’s see if we can add new links
// 				const nodesInChangedRanges = findChildrenInRange(newState.doc, newRange, node => node.isTextblock);
//
// 				let textBlock;
//
// 				if (nodesInChangedRanges.length > 1) {
// 					// Grab the first node within the changed ranges (ex. the first of two paragraphs when hitting enter)
// 					textBlock = nodesInChangedRanges[0];
// 				} else if (
// 					nodesInChangedRanges.length &&
// 					// We want to make sure to include the block separator argument to treat hard breaks like spaces
// 					newState.doc.textBetween(newRange.from, newRange.to, ' ', ' ').endsWith(' ')
// 				) {
// 					textBlock = nodesInChangedRanges[0];
// 				}
//
// 				if (textBlock) {
// 					const textNode = textBlock.node;
// 					const textContent = textBlock.node.textContent;
// 					const matches = options.getMatches(textContent);
//
// 					// if (!textContent && !options.validate(textContent)) {
// 					// return;
// 					// }
//
// 					// const attributes = options.getAttributes(match);
// 					//
// 					// const textStart = textContent.indexOf(match) + 1;
// 					// const textEnd = textStart + match.length;
// 					//
// 					// // console.log({ textContent, textStart, textEnd, getMatches: options.getMatches(textContent) });
// 					//
// 					// let schema = newState.schema;
// 					// let node = schema.text(attributes.text, [schema.marks.link.create(attributes)]);
// 					//
// 					// tr.replaceWith(textStart, textEnd, node);
//
// 					// try to match multipel links
//
// 					if (!textContent.length) {
// 						return;
// 					}
//
// 					// console.log({ textContent, matches });
//
// 					// const uniqueMatches = [...new Set(options.getMatches(matches))];
//
// 					if (!matches.length) {
// 						return;
// 					}
//
// 					// As the client can past a text with multiple Markdown links and some links can appear multiple times
// 					// we need to make sure we are replacing the correct link
// 					const result = matches.filter(match => (options.validate(match) ? match : null));
//
// 					console.log([...result]);
// 					// create groups of matches by value
// 					const groups = result.reduce((groupss, match) => {
// 						const value = match;
//
// 						if (!groupss[value]) {
// 							groupss[value] = 1;
// 						} else {
// 							groupss[value] = groupss[value] + 1;
// 						}
//
// 						// groups[value].push(match);
// 						return groupss;
// 					}, {});
//
// 					console.log(groups);
//
//
// 					let schema = newState.schema;
// 					let node = schema.text('hahha', [schema.marks.link.create({ href: 'https://hahha.com', text: 'hahha' })]);
// 					tr.replaceWith(3, 31, node);
//
// 					tr.get
// 					tr.replaceWith(34, 65, node);
// 					tr.replaceWith(85, 111, node);
//
// 					// Object.keys(groups).forEach(match => {
// 					// console.log(match, groups[match]);
// 					//
// 					// const attributes = options.getAttributes(match);
// 					//
// 					// for (let i = 0; i < groups[match]; i++) {
// 					//
// 					// for (let index = 0; index < groups[match]; index++) {
// 					//
// 					// }
// 					//
// 					// const lastPosition = textContent.lastIndexOf(match);
// 					//
// 					// const textStart = textContent.indexOf(match, 60) + 1;
// 					//
// 					// if (textStart === -1) {
// 					// return;
// 					// }
// 					//
// 					//
// 					// const textEnd = textStart + match.length;
// 					//
// 					// console.log({ textContent, textStart, textEnd, index: i });
// 					//
// 					// let schema = newState.schema;
// 					// let node = schema.text(attributes.text, [schema.marks.link.create(attributes)]);
// 					//
// 					// tr.replaceWith(textStart, textEnd, node);
// 					// }
// 					//
// 					// // do something with obj[key]
// 					// });
//
// 					console.log('end');
//
// 					// return;
// 					//
// 					// matches.forEach((match, index) => {
// 					// console.log('match', { match, index });
// 					//
// 					// let position = textContent.indexOf(match) + 1;
// 					// let positions = [position];
// 					//
// 					// while (position !== -1) {
// 					// position = textContent.indexOf(match, position + 1);
// 					// positions.push(position);
// 					// }
// 					//
// 					// // if (positions) {
// 					// // return;
// 					// // }
// 					//
// 					// console.log(positions.filter(position => position !== -1));
// 					//
// 					// positions
// 					// // Remove the last position as it is -1
// 					// .filter(position => position !== -1)
// 					// .forEach((position, index) => {
// 					// const matchStart = position;
// 					// const matchEnd = matchStart + (match.length - 1);
// 					//
// 					// const attributes = options.getAttributes(match);
// 					//
// 					// console.log({ match, matchStart, matchEnd });
// 					//
// 					// let schema = newState.schema;
// 					// let node = schema.text(attributes.text.trim(), [schema.marks.link.create(attributes)]);
// 					//
// 					// tr.replaceWith(matchStart, matchEnd, node);
// 					// });
// 					// });
//
// 					// other code
//
// 					// console.log('positions', positions);
// 					//
// 					// return;
// 					//
// 					// const attributes = options.getAttributes(match);
// 					//
// 					// const textStart = textContent.indexOf(match) + 1;
// 					// const textEnd = textStart + match.length;
// 					//
// 					// console.log({ match, textStart, textEnd });
// 					//
// 					// let schema = newState.schema;
// 					// let node = schema.text(attributes.text.trim(), [schema.marks.link.create(attributes)]);
// 					//
// 					// tr.replaceWith(textStart, textEnd, node);
// 					// });
//
// 					// console.log({matches});
//
// 					// if (!options.validate(lastWordBeforeSpace)) {
// 					// return;
// 					// }
// 					//
// 					// const matchResults = options.getMatchResults(textContent);
// 					//
// 					// console.log({ matchResultsLength: matchResults.length, matchResults });
// 					//
// 					// if (!matchResults.length) {
// 					// return;
// 					// }
// 					//
// 					// const attributes = options.getAttributes(lastWordBeforeSpace);
// 					//
// 					// const textEnd = oldRange.to;
// 					// const textStart = textEnd - lastWordBeforeSpace.length;
// 					//
// 					// let schema = newState.schema;
// 					// let node = schema.text(attributes.text, [schema.marks.link.create(attributes)]);
// 					//
// 					// tr.replaceWith(textStart, textEnd, node);
//
// 					// find(lastWordBeforeSpace)
// 					// .filter(link => link.isLink)
// 					//
// 					// // calculate link position
// 					// .map(link => ({
// 					// ...link,
// 					// from: lastWordAndBlockOffset + link.start + 1,
// 					// to: lastWordAndBlockOffset + link.end + 1
// 					// }))
// 					// .map(link => {
// 					// console.log({ link });
// 					//
// 					// return link;
// 					// })
// 					// // add link mark
// 					// .forEach(link => {
// 					// console.log({
// 					// ...textBlock,
// 					// textBeforeWhitespace,
// 					// lastWordBeforeSpace,
// 					// link,
// 					// oldRangeFrom: oldRange.from,
// 					// oldRangeTo: oldRange.to
// 					// });
// 					//
// 					// const textEnd = oldRange.to;
// 					// console.log({ textEnd });
// 					// const textStart = textEnd - lastWordBeforeSpace.length;
// 					//
// 					// console.log({ textEnd, textStart });
// 					//
// 					// console.log(newState.selection);
// 					//
// 					// // let attrs={ title: 'mylink', href:'google.com' }
// 					// let schema = newState.schema;
// 					//
// 					// console.log({ ...schema });
// 					// let node = schema.text(attributes.text, [schema.marks.link.create(attributes)]);
// 					// console.log({ node });
// 					// tr.replaceWith(textStart, textEnd, node);
// 					//
// 					// // if (textEnd < range.to) {
// 					// // tr.delete(textStart, textEnd);
// 					// // }
// 					// //
// 					// // if (textStart > range.from) {
// 					// // tr.delete(range.from + startSpaces, textStart);
// 					// // }
// 					//
// 					// // tr.addMark(textStart, textEnd, options.type.create(attributes));
// 					//
// 					// // .forEach(link => {
// 					// // tr.addMark(
// 					// // link.from,
// 					// // link.to,
// 					// // options.type.create({
// 					// // href: link.href
// 					// // })
// 					// // );
// 					// });
//
// 					// .validate(lastWordBeforeSpace)
// 					// .filter(text => console.log({validated: text}))
// 					// .filter(link => {
// 					// console.log({ link, lastWordAndBlockOffset });
// 					// if (options.validate) {
// 					// return options.validate(link.value);
// 					// }
// 					// return true;
// 					// })
// 					// // calculate link position
// 					// .map(link => ({
// 					// ...link,
// 					// from: lastWordAndBlockOffset + link.start + 1,
// 					// to: lastWordAndBlockOffset + link.end + 1
// 					// }))
// 					// // add link mark
// 					// .forEach(link => {
// 					// tr.addMark(
// 					// link.from,
// 					// link.to,
// 					// options.type.create({
// 					// href: link.href
// 					// })
// 					// );
// 					// });
// 				}
// 			});
//
// 			if (!tr.steps.length) {
// 				return;
// 			}
//
// 			return tr;
// 		}
// 	});
// }