import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

interface AuthContextType {
  user: User | null; // 현재 로그인한 사용자
  loading: boolean; // 로딩 상태
}

// 2️⃣ Context 생성
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// 3️⃣ Provider 컴포넌트 생성
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 4️⃣ Firebase 인증 상태 감지
  useEffect(() => {
    // Firebase가 자동으로 로그인 상태 추적
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
