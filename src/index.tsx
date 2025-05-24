import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [stateArticle, setStateArticle] = useState<ArticleStateType>({
		fontFamilyOption: fontFamilyOptions[0],
		fontColor: fontColors[0],
		backgroundColor: backgroundColors[0],
		contentWidth: contentWidthArr[0],
		fontSizeOption: fontSizeOptions[0],
	});

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': stateArticle.fontFamilyOption.value,
					'--font-size': stateArticle.fontSizeOption.value,
					'--font-color': stateArticle.fontColor.value,
					'--container-width': stateArticle.contentWidth.value,
					'--bg-color': stateArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setStateArticle={setStateArticle} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
