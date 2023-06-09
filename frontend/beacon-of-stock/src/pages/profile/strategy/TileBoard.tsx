import { getCookie } from '../../../assets/config/Cookie';
import axios_api from '../../../assets/config/Axios';
import star from '../../../assets/img/star.png';
import starOn from '../../../assets/img/starOn.png';
import { useCallback, useEffect, useState } from 'react';
import StrategyGraph from './StrategyGraph';
import { useNavigate } from 'react-router';

type TileBoard = {
  item: any;
};

export const TileBoard = ({ item }: TileBoard) => {
  const navigate = useNavigate();

  // console.log('1', item);
  const title = item.title;
  const strategyId = item.strategyId;
  const token = getCookie('accessToken');
  const [rep, setRep] = useState<boolean>(false);

  // ===============전략 그리기 용 axios get===================
  const fatchData = useCallback(() => {
    axios_api
      .get(`/strategies/${strategyId}`, {
        headers: {
          authentication: token,
        },
      })
      .then((res) => {
        // console.log(res);
        setRep(res.data.representative);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [item, rep]);
  // ===========================================================

  useEffect(() => {
    fatchData();
  }, []);

  const putStrategy = () => {
    axios_api
      .put(
        `/strategies/${strategyId}`,
        { strategyId: strategyId },
        {
          headers: {
            authentication: token,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        fatchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 백테스트로 리다이렉트
  const backtestHandler = () => {
    // console.log(item.indicators);
    navigate('/', { state: { indicators: item.indicators } });
  };

  // console.log(item);
  // console.log(item.indicators);

  return (
    <div className='relative w-[240px] h-[180px] border-[#A47ECF] rounded-md border-2 m-auto my-2 overflow-hidden hover:scale-125 bg-[#fefefe] z-0 hover:z-10 duration-500'>
      <StrategyGraph cumulativeReturnDtos={item.cummulateReturnDtos} />
      <div className='absolute right-1 top-1' onClick={putStrategy}>
        {rep ? (
          <img src={starOn} alt='starOn' />
        ) : (
          <img src={star} alt='star' />
        )}
      </div>
      <div
        className='absolute grid content-center border-[#A47ECF] border-2 bg-[#A47ECF] w-[240px] h-[65px] rounded-b-md -bottom-[9px] my-2 -right-[1.5px] m-auto'
        onClick={backtestHandler}
      >
        <p className='text-[#FEFEFE] text-center'>{title}</p>
      </div>
    </div>
  );
};
