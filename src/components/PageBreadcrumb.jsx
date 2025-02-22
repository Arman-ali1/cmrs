import { Helmet } from 'react-helmet';
const PageBreadcrumb = ({
  title
}) => {
  return <>
			<Helmet>
				<title>{title} | Adminto - Responsive Bootstrap 5 Admin Dashboard</title>
			</Helmet>
		</>;
};
export default PageBreadcrumb;