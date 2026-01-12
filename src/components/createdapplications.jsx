import React from 'react'
import { getApplications } from '@/api/apiApplications';
import useFetch from '@/hooks/usefetch';
import { Applicationcard } from './applicationcard';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';

const CreatedApplications = () => {
     const { user } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
  }, []);

   return (
    <div className="flex flex-col gap-2">
      {applications?.map((application) => {
        return (
          <Applicationcard
            key={application.id}
            application={application}
            isCandidate={true}
          />
        );
      })}
    </div>
  );
};

export default CreatedApplications