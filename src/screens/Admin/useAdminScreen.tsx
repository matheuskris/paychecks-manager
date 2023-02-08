import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../store/userSlice/userSelector";
import { useRouter } from "next/router";
import {
  selectHolerits,
  selectLoading,
} from "../../store/holeritsSlice/holeritsSelector";
import { fetchHoleritsData } from "../../store/holeritsSlice/holeritsSlicer";
import { AppDispatch } from "../../store/store";
import { fetchProjectsList } from "../../store/projectsSlice/projectsListSlicer";
import { selectProjectsList } from "../../store/projectsSlice/projectsListSelector";

const useAdminScreen = () => {
  const userInfo = useSelector(selectUserInfo);
  const router = useRouter();
  const [filteredStartDate, setFiltereStartdDate] = useState("");
  const [filteredFinishDate, setFilteredFinishdDate] = useState("");
  const [paychecksListPeriods, setPaychecksListPeriods] = useState(["102022"]);

  const dispatch = useDispatch<AppDispatch>();
  const paychecks = useSelector(selectHolerits);
  const isLoading = useSelector(selectLoading);

  const projectsList = useSelector(selectProjectsList);

  useEffect(() => {
    dispatch(fetchHoleritsData(paychecksListPeriods));
  }, [paychecksListPeriods]);

  useEffect(() => {
    dispatch(fetchProjectsList());

    // if (!userInfo || userInfo?.role != "admin") {
    //   router.push("/");
    // }
  }, []);

  const checkMonth = (date: number) => {
    if (date < 10) {
      return `0${date}`;
    } else {
      return date;
    }
  };

  const filterPaychecks = () => {
    // const startDate = `${checkMonth(
    //   new Date(filteredStartDate).getMonth() + 1
    // )}${new Date(filteredStartDate).getFullYear()}`;

    // const finishDate = `${checkMonth(
    //   new Date(filteredFinishDate).getMonth() + 1
    // )}${new Date(filteredFinishDate).getFullYear()}`;

    const startMonth = new Date(filteredStartDate).getMonth() + 1;
    const startYear = new Date(filteredStartDate).getFullYear();
    const endMonth = new Date(filteredFinishDate).getMonth() + 1;
    const endYear = new Date(filteredFinishDate).getFullYear();

    const newPeriods: string[] = [];
    for (let i = startYear; i <= endYear; i++) {
      for (let u = 1; u < 13; u++) {
        if (startYear < endYear) {
          if (i == startYear) {
            if (u >= startMonth) newPeriods.push(checkMonth(u) + i.toString());
          } else if (i == endYear) {
            if (u <= endMonth) newPeriods.push(checkMonth(u) + i.toString());
          } else {
            newPeriods.push(checkMonth(u) + i.toString());
          }
        } else {
          if (u <= endMonth && u >= startMonth) {
            newPeriods.push(checkMonth(u) + i.toString());
          }
        }
      }
    }
    if (newPeriods.length < 1) newPeriods.push("102022");
    setPaychecksListPeriods(newPeriods);
    dispatch(fetchHoleritsData(paychecksListPeriods));
  };

  return [
    filterPaychecks,
    setFilteredFinishdDate,
    filteredFinishDate,
    filteredStartDate,
    setFiltereStartdDate,
    projectsList,
    isLoading,
    paychecks,
  ] as const;
};

export default useAdminScreen;
