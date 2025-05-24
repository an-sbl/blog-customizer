import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';
import { useState, useEffect, useRef } from 'react';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
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
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const setDefaultState = () => {
		setFormState(defaultArticleState);
		setStateArticle(defaultArticleState);
		setIsMenuOpen(false);
	};

	const setState = (evt: React.SyntheticEvent) => {
		evt.preventDefault();
		setStateArticle(formState);
	};
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				setIsMenuOpen(false);
			}
		};
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsMenuOpen(false);
			}
		};
		if (isMenuOpen) {
			window.addEventListener('mousedown', handleClick);
			document.addEventListener('keydown', handleEscape);
		}
		return () => {
			window.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isMenuOpen]);
	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setIsMenuOpen((prev) => !prev);
				}}
			/>
			<aside
				ref={rootRef}
				className={
					isMenuOpen
						? clsx(styles.container, styles.container_open)
						: styles.container
				}>
				<form className={styles.form} onSubmit={setState}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
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
						}
					/>
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
