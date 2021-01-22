import React from 'react'

export default ({ variant, className, isDisabledLoading, as, children, ...restButtonProps }) => {
	variant = (variant ?? 'primary') + ' '
	const buttonProps = {
		...restButtonProps,
		className: 'w-100 btn btn-' + variant + className
	}

	if (isDisabledLoading) {
		children = [
			<span className='spinner-border spinner-border-sm me-2' role='status' aria-hidden='true' key='isDisabledLoadingSpinner' />,
			...children
		]
	}

	const ButtonComponent = as ?? 'button'

	return <div className='row'>
		<div className='col-12 col-sm-auto'>
			<ButtonComponent {...buttonProps}>
				{children}
			</ButtonComponent>
		</div>
	</div>
}