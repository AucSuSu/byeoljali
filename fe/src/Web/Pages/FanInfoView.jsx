import React, { useEffect, useState } from 'react';

import axios from 'axios';

import './FanInfoView.css';

function FanInfoView() {
  const [userData, setUserData] = useState({
    nickname: '수정전 닉네임',
  });

  // axios.get 코드 => res.data 를 setUserData (useEffect를 통해 로드시 실행)

  // 이하 닉네임 수정 관련 코드
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleNicknameChange = (e) => {
    setUserData({ ...userData, nickname: e.target.value });
  };

  return (
    <div className="profile-container">
      <div className="profile-info-container">
        <div className="profile-avatar-container">
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIVFRgSFRUYGBUaGhgYGBgSGBgSGBgVGBgZGRgaGBgcIS4lHB4rHxgaJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQrJCE0NDQ0MTE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0Mf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EADsQAAIBAgMEBwYEBQUBAAAAAAABAgMRBCExBRJBUSJhcYGRobEGEzLB0fBCUnLhFCMzYrIVJGOSwvH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EACERAQEBAQACAwEAAwEAAAAAAAABEQIhMQMSQTIiYXFR/9oADAMBAAIRAxEAPwDYsLYUDm9ZLBYUApLC2AUIQLCgAlgsKAUgEOKxVOnHenJJevYuJzeN9pm7qmklzlm/DRE0dUBwP+sVpO++/GyLq9o6ig43Tnwl1dg0x2ItjziptOq3fek+1ss4bbuIhpO/VLpLzGmO+sFjncB7URl0asd3+6Oa71wOipzjJKUWmno1mNMFgsPEsAwB9hLANEsOsJYobYLDrAQNAdYLFDQHWAgAACgAAABRAAUAABTO2vtSFCN3nN/DHn1vqJ9oYyNKEqktFoub4I812jtCdSbqSeb8EuCRBJtHaM6knKcrvyXUkU4zvr4EDncbOfBFxLU7rt35IsYfPXjz5LUqr4bLiyytXyyiuy1iUh0J3Wf7/dw32nw5rrIql1bv8xN+6t4GWvK2pRnno/viX9lbYqUJWveHFPR/R9Ziqb1WvHrJ6U00Kc3Xp+CxcKsFODuuPNPkyc882LtGVCaesXlJc19T0GlUjOKnF3i1dPqLKWYcJYVgVDbCDhAEAUAEAUAEAUAEAAKAAAAAAAAAp7UxfuqU58Usv1PQDkPbDaW/P3UX0Ya24y4/Q5WpPMmrVG25PVlUyU5MmoUnJkVKG87GzhqNvvuXr5EvWLzzpKWEyuW8PhLpMuyo2h2EuBjdLvOd6rt9ZEKwsWllw87lHE4G2htU4dJx7X6BVp3Rm9eVjkalNxd+X2yOErO33Y2MZhterMxqi06jrz1rn1znld4XOs9kdo3Toyeese3ivmclRd13E2CxMqdSM1rfzQK9OYEdGqpxjNaSSa7x50cyiAAAACAKAgAKAgAACiAAAAAAAAHIe3WMsoUl+p+iOvPMvajE7+JnyT3f+uXyJVZE2RMkkMWbtyyMi9gKXE3MNTz715ZlLAU7JGrhoZrvfecuunfnnIsVFk13DMA/vuHVOHaNwUfkc9axYv8AzF1wlfucfqSMijnNfpl5yjb0J2iWooYmC3n1o5zF07d/1sdTUWbfJffoYu06PRXY/kb5uU6mxnYaeXYx2Iyz5MgpcV98CabvF9nodv1y/HeeymK36G7xi7dzzXqzaOL9hsV0nD80fOOfpc7Q3PTnQAAUAAAAAAAAAAOsFhQIpoDhGioaA6wlgGzlZN8k2eQVKm/Ocnxbfiz1vGO0JvlCX+LPJKVO/SXnwd+JKGVXYMFSux005ZLx6zSwGE5mOrkb552rlCcIRvJ25LqJobQprj1EGJwsI/iuyq8NTefm2c/FdsrTljYvRlrCNNdXy4IxqOD3ndK0fU0cOmugu98l9Tn1k9LJWhRzbnzyXZG/zuOnUS1JaUMrLQqYmhvPPJepnRDPFwzu9SljcRCSyfP5WJp0Kbdn9A/06m1lc3LyWVz8Fm196D4PLxH4mhuTtwIYStkd55cvS/7LVtytD9SXc8vmelnlOz5btXlndd1meqwldJ80n4o1z7c76KAAaQAAAAAAAAAA8AFIpAFEAAAAK+PypTf9kv8AFnj9Cq1JpZXaPXdrO1Cq/wDjn/izyCTtUT4XXmZpz4srSoxbnG+fSXmzonhpJXsc3Cv049TV/E7mULo4dWvRmOQ2hCpeyT87Ip4/CzpqEoz3k9ZLJKWVuzv5HYzw65Fd4GPITrPZ1Jf1jYPeioynPe3na13fgk+tXNeCsyaGEiuA9UszHV2rPExboromftGruxbNajDIr4jDp6q5MSXy4qtXq+8cF1W3eN9LczarQq0ZRTkpppXWkk+vmaEMBFO6WZZhhY6tHS9SzMJ4u6x9o4KU4b8Vms7HOSlZtWsejQpq1jzraLTqztwnPyk0a+O30x3/AOjBv+Yer4OV4QfOEP8AFHlOz1/MT+9P2PUtmP8AlQ/RH0Os9uX4sgAG0AAAAAAAAAASIQAIpQEBsBbhcRIJIgo7bdsPV/RLzyPI8Ys79x6vt2f+3mur5o8oxPFcsyb5PxbpUZSh7yL6SkoO/wCazf8A5O7wtTepwlxcVfttmecYTF7uUr7raba1TSa8MzuNgYiM6WUlLdbV14q/icfk5sduep1P9r7ZJCAyxLTOUapkoFeL6RaxTtBtFKM4x3btJt2V2ld8lzF9rJ4atNZDJMWjPIhc4yW/GSkr6xd0W1nD1EfFCUyXdEgZKVlc8zxLvNtcW34ts732gxSpUJz423Uubll8zzqnNt7z1d2dfjl9sd9TMX9lLp35Jnp2yZXow/SvLI802ZHJvr+aPStjr+RT/Sjrz7Yv8roCAbZKAgAKAgAKAgASAAlyKcxEFwIFAQUoyfaGW7Tb5tI872hh1JuUetNHb+2WK3IQXOd3+mMXf1RwtfEbla34Xa/ejld+3huZ9WLOPA6L2JxO7UlTeko7y7Y6+T8jO2phbdOPwvyKmAxTpVI1F+F3tzWjXhc3/XLnP8enp8hYyGQqRlFTi7xkk01yeY254+npizNpqxQr4WMrKSTS0vnbsDEYyEFeTtcpT2rGTtGS67Me2+ea04QXwPNW0eZNRoKKskkuSyRjQ2lZXcr260XcNtim1m+rJN59iLOcXrm/jSgTor0pqWaJ5SSV3klqxHJxvt7is6dFPnOX+Mf/AEcvQWRLtjG++rTqcG7R/Sso+WfeMoxyPXzM5x57d6aWCyS8T0rZMbUKf6I+h5rSeR6bs7+lTX9kfRDn2316WAADbAAAAAFABAFAB6Y2ZFRqKSTRKQJGRJcrTdh1OdyKmchFNDlAZOjyA4j29r3nGH5Yecn9EjiZtt/fI7H2lwrqOVRZyXojkFDVvUzOpSr+Arprcn8L0M3aGFdOe7w4PqHNmnC1eDT+OOhP5urZsxc9k9rW/wBvN5awb84/NHUOR57gKL3+tet/2O1wddtJS158zj80m7HT4/5WK1KM1Zoq/wAClol3ou2HRRzmuvPV59K1LBr8qLtHCRWdsx9OBPFF8nXydUsIWOd9stsKFP8Ah4PpTXSt+GHHvenZc3cViNyLa1secTpurKcpO82223zudPjkt/4497nhnpZl6Ecl3fMrToODs/8A6XYrQ71z5i1Qje3d6HqdOG7CK5RivJHl2FXyPVpxskupeg59tdIwFENsAVIVIckAiQu6OUR1gI90CSwEGBsTE3Ti3mno9bGumcbszFwg+nFtPRx+n0N3DVN+8qVTej+WWdvmjPPWxeucrRqxuV6dS0rDP4yyvOLiuazXkV69eMulCSY6v6jeou6GY6qoQlPkn48DNw+1YQjed+5XZzvtB7VRqQdOEJJXzctfBDd9LGcto2bvmpN9y4FHa2Dy95BX5pepRrV76GlsTFb16c81wbOfXP18xdlc8tSbC1HCamtNH2GpjdjOM8vheljQwWw95PeWVmv3NfaWJJdVZUI7yqR+GWZs4dZGbgoOO9RlrF5dxqUI5Hn7ejn0nhNrJ5onhNEKQ6KOWtLUJpDpVuRBFiTmXaziHHT6LOPwclGtKL0k34t3R0+LndHMY6leV1r1HX4vHhep4ljT2nsy8N/lmZMUdnh8DU/h1CbvOW6nb+6Sy7bGJtTZUqdSSs2nZxaVzvPTjfNUcI8/vgesPNRa4pPyPLaVGUWrpp9aaO32ZtroRjNPJJXXUWXKnU2NndG2H0a0Jq8Xcc4HTWMMih8UKojkgCwthQIpAFADgNsYepGaU913SV/hUraN8n1kGHxEafxKTu9Yu04/JnXYjCwqNXV2r58r6+hh7V2J7uHvFO7yUk1ZO/7nLrmy7GuetmJsHtOpvbk4SnFx3k1G09znbRlzD4XDVlKcG97ivhcX1xMPYu0Fh5veheMuK+KCfrHibm2MLBL30J7k2stx23+NklqzU8zfbNnnEcN6lKzzRar4XD149KEW+ayku9ZmNOtXjaNW9mrptK/kXcPGM4pp2kuK+YnXnIzYoz9k4b14zaWfKVvEKXswou7nfrf00N6E5w+Jby5r6FiMlLNG/FNrKhs+MbXz7S7ChG2SLE4XRBTusmSSQ21h7W2baXv49SkurS/oQQR1E4Jpp6PI52pRcG4Pg/LgcPl5zy7fH1viiI4aojkjz466HIiqTHyRBNBYq4mZW2bhN+tGNsk959iz+hPWize9ncBuQ94/il5RWn18Dr8fO1O+vry0JU7yguCbl4JpeparUVLgG5ncngj048yusKtbFmGGhxS8BYomiJBHHDRTukl2ZehM4ixHWNYI7CD3GwxIBUhByABoDgAy3UjSg5Semb5t8l1kNHD7636qu5aQlnGEeCt+bmyCE/fT3taVN5cpz59iLGLxln7uHSqPRL8N+MvoZ39M/GN7QYVzqwjBJuUbWWTTV7Pqy9CnsXaKhLp9KKyu1eUOxcFrodNgcI4Lem96b1k83bldmdtbZC3L0odPfvfK7U3mm+SuuyxLLP8AKLs9L2Ko08RCLjJNJp3j5oxsUpUp3hkuWqKOz9oVKEnGy1tKDyz7eD8jVniqdZJxylxjLX9yWyzZ7S82LWztrU5rdm1GfJ6PsZfnR4xdn1aMy6uyY1Ix0VtcteRF/E1KLVObe6llKKv0etcS7Z7TN9NmNRrKWT8grQushlOG8k9/eT5WsPjFx7DXuISlK+XEpbTo6T5ZPsLVRbr3loTSipJp6NWJ1PtMXm5dYKQth8qbi3F8BN08mPQilAhlEt7pHOA+qyq0aO81Hi3Y6jDwSSS0WRk7Ko3k5vhku1/t6m3BHo+PnJrj8nW3D7AgA6sHKSQ+M1zGIVWCposkTIUySLAeMkhUwYDQAAAAADn4K8Y06T3YLWaz04Rvq+vQu4bBQim4t3bvJyd22PW7FWySXhYilj6MVlPP+zpu/YjPiHmpd9p2ZK88zOltaN7KDkuLyjl2PMi/1a0n0GocbuLfVlfLxH2h9ekW2tkxnGU4RXvLp303lkmn3Z9xz1PD1IzVOWU07Li78NOD5nVQ2vRbSbcb/mWX/ZZWGbT2fCvHfhJb8V0ZQas3qk2vtXM9cy+Y1zbPHR2y8UpLck7TWqeV7atF2cE9Unwz5M5iPThOpJuNWn8a0zj+LqlZeTNfZe1Pefy5pqaV9HaS59XYXm/lZ6mekdTCVac70fgd24t5di6y9hsVGayyktYvJp9hZKWOwe/0o9Ga0ksu5msz0m77WZwurDKLt0WVcNipxe5WspfhktJfRlurH8SH+zMV8fS0mux/Iq7prNKSs9GZVSDi3F/aOXfOXW+bswySIpRvkh8pE2ApXlvPRadpiTbjVuTV/C0VGKj934lqIyJIj0uQABUA4ENHALcWMyKcwjIirSYXIlIVsCUQIvJAAAAFGZT2ZTTbacr/AJ252fNNlnD4OnC9o6u+fS8LnPQ21ibpOEMpbrycc07NXbsjVobRqtveoTta63GpebsjlOpWvK7Uw8FK6ik3rbj2kc6K4DJbRhlvRnB/8kWl4rIklXjZNO99N3O76jcsZzWdiMHTklGUbJaWyslwTXAqz2bUhedGb1vuXaT6m08+/wATZqRus1Z8tbEVNchkptjL2biadScnJKFVrclHhJx4pPitLBtHZ85T95Ge7JRya1clpnwyyLmP2bCrHdfRlfeUo6qXPr4FfAYion7isumvgn+GcV1/mXIZ+Vbd8w7ZO0N9bk2veLVW3brnY0TD2vs6V1UpX30/w5W6/qXdk451YXkrTT3ZLrXHqTHNvqs2fsWsRQjOO7JXRShv0pbkpb1N6N5uL5N8jRuEopqzzTLYSikyLHYfejdfEvNciLDr3ctxvov4G+H9peTJk6mUniueheUlFas3KVJRSiuA2GEipuotX5c2u0nsTnn6r11oQ5DRUaQ4AAoUZKd8kJKV8uA+MSe1NURbDrhcBYsGxEDAmpPIeRUXmSgAABRzm2vgh+ur6yNDYX9FdsvUAOHP9On4v1fh8DDwP9efeAGuvcZjVqFehx7WAHSM1LIq4r8H64/MAFSJpmDsf+vW+/xSACfsJ6reQoAaRWx/wx/VH/JFwAJPanIUAKEBABA4JaMACmRJGACIawQARSisAAdS1JwAoAACj//Z"
            alt="Profile Avatar"
            className="profile-avatar"
          />
        </div>
        <div className="profile-info">
          {isEditing ? (
            <input
              type="text"
              value={userData.nickname}
              onChange={handleNicknameChange}
            />
          ) : (
            <span>
              <strong>닉네임: </strong>
              {userData.nickname}
            </span>
          )}
          <button onClick={handleEditClick} className="profile-edit-btn">
            {isEditing ? '대충 저장 버튼' : '대충 수정 버튼'}
          </button>
          <p>
            <strong>이름 : </strong>윤하
          </p>
          <p>
            <strong>생년월일 : </strong>2000.07.22
          </p>
          <p>
            <strong>이메일 : </strong>oksusu@naver.com
          </p>
        </div>
      </div>
      <div className="divider"></div>
      <div className="profile-auth-container">
        <div className="profile-auth">
          <button className="profile-button">인증사진 등록하기</button>
          <p className="auth-info">대충 4번만 된다는 내용</p>
          <div className="profile-attempt">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcs6FsD5aTDC5Y5H8CTEZVJsKwlyCOgHahRw&usqp=CAU"
              alt="auth img"
              className="auth-avatar"
            />
            <h3>2 / 4</h3>
          </div>
        </div>
        <div className="profile-announce">
          <h1>옥수수 공지사항</h1>
          <p>치킨 야미야미</p>
        </div>
      </div>
    </div>
  );
}

export default FanInfoView;
