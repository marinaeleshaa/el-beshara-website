// "use client";
import { getAbout } from "@/lib/api/about";
import { IsProfile } from "@/lib/guards/IsProfile";

import { getLocale, getTranslations } from "next-intl/server";

const FooterContact = async () => {
  const tFooter = await getTranslations("footer");
  const profile = await getAbout();
  // const { profile } = useSelector(profileSelector);
  // const dispatch = useDispatch<AppDispatch>();
  const lang = await getLocale();

  //  useEffect(() => {
  //     dispatch(getProfileDataAction());

  //   }, [dispatch]);
  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"} className="space-y-4">
      <h4 className="text-lg font-semibold text-white">
        {tFooter("contactUs")}
      </h4>
      <div className="space-y-3 text-sm text-gray-400">
        {IsProfile(profile) && (
          <>
            <p>
              {profile.address.building} {profile.address.street}
            </p>
            <p>{profile.address.city}, Egypt</p>
            <p>{profile.email}</p>
            <ul>
              {profile.phoneNumbers.map((number: string, index: number) => (
                <li key={index}>{number}</li>
              ))}
            </ul>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default FooterContact;
