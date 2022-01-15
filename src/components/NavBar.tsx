import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useMeQuery } from '../generated/graphql';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
	const [{ data, fetching }] = useMeQuery();
	let body = null;

	if (fetching) {
		// loading
		body = <p>loading ...</p>;
	} else if (!data?.me) {
		// user is not logged in
		body = (
			<>
				<NextLink href='/login' passHref>
					<Link color='white' mr={2}>
						Login
					</Link>
				</NextLink>
				<NextLink href='/register' passHref>
					<Link color='white'>Register</Link>
				</NextLink>
			</>
		);
	} else {
		// user logged in
		body = (
			<Flex>
				<Box mr={4}>{data.me.username}</Box>
        <Button variant={"link"}>logout</Button>
      </Flex>
		);
	}

	return (
		<Flex bg='tan' p={4}>
      <Box ml='auto'>
        {body}
      </Box>
		</Flex>
	);
};

export default NavBar;
