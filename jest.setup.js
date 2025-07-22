import '@testing-library/jest-dom';
import Image from 'next/image';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock Next.js Image component
jest.mock('next/image', () => {
  const MockImage = ({ src, alt, ...props }) => {
    return <Image src={src} alt={alt} {...props} />;
  };
  MockImage.displayName = 'MockImage';
  return MockImage;
});

// Mock Next.js Head component
jest.mock('next/head', () => {
  const MockHead = ({ children }) => {
    return <>{children}</>;
  };
  MockHead.displayName = 'MockHead';
  return MockHead;
});

// Mock next-seo
jest.mock('next-seo', () => {
  const MockNextSeo = ({ children, ...props }) => (
    <div data-testid="next-seo" {...props}>
      {children}
    </div>
  );
  MockNextSeo.displayName = 'MockNextSeo';
  return {
    NextSeo: MockNextSeo,
  };
});

// Mock next-themes
jest.mock('next-themes', () => {
  const MockThemeProvider = ({ children }) => children;
  MockThemeProvider.displayName = 'MockThemeProvider';
  return {
    useTheme: () => ({
      theme: 'light',
      setTheme: jest.fn(),
      resolvedTheme: 'light',
    }),
    ThemeProvider: MockThemeProvider,
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => {
  const MockAnimatePresence = ({ children }) => children;
  MockAnimatePresence.displayName = 'MockAnimatePresence';

  return {
    motion: {
      div: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <div {...props}>{children}</div>,
      span: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <span {...props}>{children}</span>,
      h1: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <h1 {...props}>{children}</h1>,
      h2: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <h2 {...props}>{children}</h2>,
      h3: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <h3 {...props}>{children}</h3>,
      p: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <p {...props}>{children}</p>,
      a: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <a {...props}>{children}</a>,
      button: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <button {...props}>{children}</button>,
    },
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
      set: jest.fn(),
    }),
    useInView: () => true,
    AnimatePresence: MockAnimatePresence,
  };
});

// Mock motion/react (alternative import)
jest.mock('motion/react', () => {
  const MockAnimatePresence = ({ children }) => children;
  MockAnimatePresence.displayName = 'MockAnimatePresence';

  return {
    motion: {
      div: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <div {...props}>{children}</div>,
      span: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <span {...props}>{children}</span>,
      h1: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <h1 {...props}>{children}</h1>,
      h2: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <h2 {...props}>{children}</h2>,
      h3: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <h3 {...props}>{children}</h3>,
      p: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <p {...props}>{children}</p>,
      a: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <a {...props}>{children}</a>,
      button: ({
        children,
        whileHover,
        whileTap,
        initial,
        animate,
        exit,
        transition,
        variants,
        ...props
      }) => <button {...props}>{children}</button>,
    },
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
      set: jest.fn(),
    }),
    useInView: () => true,
    AnimatePresence: MockAnimatePresence,
  };
});

// Mock Swiper CSS
jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));
jest.mock('swiper/css/pagination', () => ({}));
jest.mock('swiper/css/autoplay', () => ({}));
jest.mock('swiper/swiper.css', () => ({}));

// Mock Swiper components
jest.mock('swiper/react', () => {
  const MockSwiper = ({
    children,
    spaceBetween,
    slidesPerView,
    centeredSlides,
    loop,
    effect,
    coverflowEffect,
    pagination,
    navigation,
    modules,
    autoplay,
    grabCursor,
    ...props
  }) => (
    <div data-testid="swiper" {...props}>
      {children}
    </div>
  );
  MockSwiper.displayName = 'MockSwiper';

  const MockSwiperSlide = ({ children, ...props }) => (
    <div data-testid="swiper-slide" {...props}>
      {children}
    </div>
  );
  MockSwiperSlide.displayName = 'MockSwiperSlide';

  return {
    Swiper: MockSwiper,
    SwiperSlide: MockSwiperSlide,
  };
});

jest.mock('swiper/modules', () => ({
  Autoplay: {},
  EffectCoverflow: {},
  Navigation: {},
  Pagination: {},
}));

// Mock Apollo Client
jest.mock('@apollo/client', () => {
  const MockApolloProvider = ({ children }) => children;
  MockApolloProvider.displayName = 'MockApolloProvider';

  return {
    ApolloClient: jest.fn().mockImplementation(() => ({
      query: jest.fn(),
      mutate: jest.fn(),
      watchQuery: jest.fn(),
    })),
    InMemoryCache: jest.fn(),
    gql: jest.fn(),
    useQuery: jest.fn(() => ({
      loading: false,
      error: null,
      data: null,
    })),
    useMutation: jest.fn(() => [jest.fn(), { loading: false, error: null }]),
    ApolloProvider: MockApolloProvider,
  };
});

// Mock react-responsive
jest.mock('react-responsive', () => ({
  useMediaQuery: () => false,
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Suppress console warnings during tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
