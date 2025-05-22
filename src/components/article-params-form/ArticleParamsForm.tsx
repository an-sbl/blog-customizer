import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';
import { useState } from 'react';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from '../../constants/articleProps';

type ArticleParamsFormProps = {
	setStateArticle: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};
export const ArticleParamsForm = ({
	setStateArticle,
}: ArticleParamsFormProps) => {
	const [opened, setOpened] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const setDefaultState = () => {
		setFormState(defaultArticleState);
		setStateArticle(defaultArticleState);
		setOpened(false);
	};

	const setState = (evt: React.SyntheticEvent) => {
		evt.preventDefault();
		setStateArticle(formState);
	};
	return (
		<>
			<ArrowButton
				isOpen={opened}
				onClick={() => {
					setOpened((prev) => !prev);
				}}
			/>
			<aside
				className={
					opened
						? clsx(styles.container, styles.container_open)
						: styles.container
				}>
				<form className={styles.form} onSubmit={setState}>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder={'Шрифт'}
						onChange={(selected) =>
							setFormState((oprevState) => ({
								...oprevState,
								fontFamilyOption: selected,
							}))
						}
						title={'Шрифт'}
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						name='Размер шрифта'
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(selected) =>
							setFormState((oprevState) => ({
								...oprevState,
								fontSizeOption: selected,
							}))
						}></RadioGroup>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder={'Цвет шрифта'}
						onChange={(selected) =>
							setFormState((oprevState) => ({
								...oprevState,
								fontColor: selected,
							}))
						}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder={'Цвет фона'}
						onChange={(selected) =>
							setFormState((oprevState) => ({
								...oprevState,
								backgroundColor: selected,
							}))
						}
						title={'Цвет фона'}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder={'Ширина контента'}
						onChange={(selected) =>
							setFormState((oprevState) => ({
								...oprevState,
								contentWidth: selected,
							}))
						}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button
							onClick={setDefaultState}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
