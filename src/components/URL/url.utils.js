import { CompositeDecorator } from 'draft-js';

const CurlySpan = props => {
	return (
		<span {...props} style={styles.curly}>
			{props.children}
		</span>
	);
};

export const styles = {
	root: {
		fontFamily: '\'Helvetica\', sans-serif',
		padding: 20,
		width: 600,
	},
	editor: {
		border: '1px solid #ddd',
		cursor: 'text',
		fontSize: 16,
		minHeight: 40,
		padding: 10,
	},
	button: {
		marginTop: 10,
		textAlign: 'center',
	},
	handle: {
		color: 'rgba(98, 177, 254, 1.0)',
		direction: 'ltr',
		unicodeBidi: 'bidi-override',
	},
	hashtag: {
		color: 'rgba(95, 184, 138, 1.0)',
	},
	curly: {
		color: '#ff6c37',
	}
};

export const compositeDecorator = new CompositeDecorator([
	{
		strategy: curlyStrategy,
		component: CurlySpan,
	},
]);

const CURLY_REGEX = /\{\{([^{}]+)\}\}/g;

function curlyStrategy(contentBlock, callback, contentState) {
	findWithRegex(CURLY_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
	const text = contentBlock.getText();
	let matchArr, start;
	while ((matchArr = regex.exec(text)) !== null) {
		start = matchArr.index;
		callback(start, start + matchArr[0].length);
	}
}