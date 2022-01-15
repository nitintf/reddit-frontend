import React from 'react';
import { Form, Formik } from 'formik';
import {
	Box,
	Button,
} from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';
import InputField from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';

interface registerProps { }

const LoginPage: React.FC<registerProps> = ({ }) => {
	const router = useRouter()
	const [,login] = useLoginMutation()
	return (
		<Wrapper variant='small'>
			<Formik
				initialValues={{
					username: '',
					password: '',
				}}
				onSubmit={async (values, {setErrors}) => {
					const response = await login({options: values})
					if (response.data?.login.errors) {
						setErrors(toErrorMap(response.data?.login.errors))
					} else if (response.data?.login.user) {
						router.push('/')
					}
				}}>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name='username'
							placeholder='username'
							label='Username'
						/>
						<Box mt={4}>
							<InputField
								name='password'
								placeholder='password'
								label='Password'
								type='password'
							/>
						</Box>
                        <Button    
                            color='white'
                            bgColor='teal'
							type='submit'
                            mt={4}
                            width="100%"
							isLoading={isSubmitting}>
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default LoginPage;
