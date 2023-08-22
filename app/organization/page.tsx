import { Navbar } from 'components/@navbar/navbar';
import { OrganizationForm } from 'components/@organization/organization-form';

const OrganizationPage = () => {
  return (
    <div>
      <Navbar />
      <div className="border-b-[1px] bg-white p-8">
        <div className="mx-auto flex max-w-screen-lg items-center justify-between">
          <h2 className="max-w-screen-lg text-2xl text-neutral-500">
            Organization
          </h2>
        </div>
      </div>
      <div className="min-h-[calc(100vh-163px)] bg-gray-50">
        <div className="mx-auto max-w-screen-lg pt-8">
          <OrganizationForm />
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;
