import { OrganizationForm } from '@/components/organization-form';

const OrganizationPage = () => {
  return (
    <div className="max-w-2xl p-5 mx-auto mt-5 border rounded">
      <h1 className="text-xl font-semibold">Create a new organization</h1>
      <p className="mt-2 text-sm text-gray-500">
        Organizations allow you to group projects under a single umbrella. You
        can create multiple organizations and invite your team members to them.
      </p>
      <div className="mt-5">
        <OrganizationForm />
      </div>
    </div>
  );
};

export default OrganizationPage;
