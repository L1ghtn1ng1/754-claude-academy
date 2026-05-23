const CODE_SHAPE_BASE = `public class Shape {
    public double area() {
        return 0.0;
    }

    public void printArea() {
        System.out.printf("Area: %.2f%n", area());
    }
}`;

const CODE_SHAPE_SUBCLASSES = `public class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

public class Rectangle extends Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }
}`;

const CODE_DYNAMIC_DISPATCH = `// The reference type is Shape — the actual types vary at runtime
Shape[] shapes = {
    new Circle(5.0),
    new Rectangle(4.0, 6.0),
    new Circle(3.0)
};

for (Shape s : shapes) {
    s.printArea();   // the correct area() is resolved at runtime
}

// Output:
// Area: 78.54
// Area: 24.00
// Area: 28.27`;

const CODE_REFERENCE_TYPE = `Animal a = new Dog("Rex", 3, "German Shepherd");

// Allowed — speak() is defined on Animal
a.eat();

// Not allowed — fetch() is only on Dog, not Animal
// a.fetch();  // compile error`;

const CODE_OVERLOADING = `public class Formatter {
    // Overloaded methods — same name, different parameter lists
    public String format(int value) {
        return String.valueOf(value);
    }

    public String format(double value) {
        return String.format("%.2f", value);
    }

    public String format(String value, int maxLength) {
        return value.length() > maxLength
            ? value.substring(0, maxLength) + "…"
            : value;
    }
}`;

export default function PolymorphismPage() {
  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <div className="lesson-header-inner">
          <span className="course-label">Java OOP Fundamentals</span>
          <nav className="lesson-nav">
            <a className="nav-item" href="/inheritance">1. Inheritance</a>
            <span className="nav-sep">›</span>
            <span className="nav-item nav-item-active">2. Polymorphism</span>
          </nav>
        </div>
      </header>

      <main className="lesson-main">
        <div className="lesson-container">
          <div className="lesson-intro">
            <h1 className="lesson-title">Polymorphism</h1>
            <p className="lesson-lead">
              Polymorphism — from the Greek for "many forms" — is the ability of a single interface
              to represent different underlying types. In Java, it lets you write code against a
              general type while the correct behavior for each specific subtype is resolved
              automatically.
            </p>
          </div>

          {/* Section 1 */}
          <section className="lesson-section">
            <h2 className="section-title">Two Kinds of Polymorphism</h2>
            <p>
              Java supports polymorphism through two mechanisms that operate at different points in
              the program's life cycle:
            </p>
            <div className="info-grid">
              <div className="info-card">
                <h3>Compile-time Polymorphism</h3>
                <p className="info-card-subtitle">Method Overloading</p>
                <p>
                  Multiple methods share the same name but differ in their parameter list. The
                  compiler selects the correct version based on the argument types and count at
                  compile time.
                </p>
              </div>
              <div className="info-card">
                <h3>Runtime Polymorphism</h3>
                <p className="info-card-subtitle">Method Overriding</p>
                <p>
                  A subclass provides its own implementation of an inherited method. Which version
                  runs is determined at runtime by the actual type of the object, not the declared
                  type of the reference.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="lesson-section">
            <h2 className="section-title">Runtime Polymorphism: Dynamic Dispatch</h2>
            <p>
              Consider a hierarchy of shapes. The superclass defines a common interface; each
              subclass specializes it:
            </p>
            <div className="code-block-wrapper">
              <span className="code-lang">Java</span>
              <pre className="code-block"><code>{CODE_SHAPE_BASE}</code></pre>
            </div>
            <div className="code-block-wrapper">
              <span className="code-lang">Java</span>
              <pre className="code-block"><code>{CODE_SHAPE_SUBCLASSES}</code></pre>
            </div>
            <p>
              Now the power of runtime polymorphism: you can write a loop over an array of{' '}
              <code>Shape</code> references and call <code>printArea()</code> on each — the JVM
              dispatches to the correct <code>area()</code> implementation at runtime.
            </p>
            <div className="code-block-wrapper">
              <span className="code-lang">Java</span>
              <pre className="code-block"><code>{CODE_DYNAMIC_DISPATCH}</code></pre>
            </div>
            <div className="callout callout-info">
              <strong>Dynamic dispatch:</strong> The JVM keeps a virtual method table (vtable) for
              each class. At runtime, it looks up the correct method based on the object's actual
              type — this is the mechanism that makes polymorphism work.
            </div>
          </section>

          {/* Section 3 */}
          <section className="lesson-section">
            <h2 className="section-title">Reference Type vs. Object Type</h2>
            <p>
              In Java, a reference variable and the object it points to can be different types —
              provided the object's type is a subtype of the reference's type.
            </p>
            <div className="code-block-wrapper">
              <span className="code-lang">Java</span>
              <pre className="code-block"><code>{CODE_REFERENCE_TYPE}</code></pre>
            </div>
            <p>The distinction has practical consequences:</p>
            <ul className="prose-list">
              <li>
                The <strong>declared (reference) type</strong> determines what methods you are
                allowed to call — it governs the compile-time view.
              </li>
              <li>
                The <strong>actual (runtime) type</strong> determines which implementation of those
                methods actually runs — it governs behavior.
              </li>
            </ul>
            <p>
              This separation is what allows you to write general-purpose code. A method that
              accepts a <code>Shape</code> parameter works correctly for any subclass of{' '}
              <code>Shape</code> passed to it, without modification.
            </p>
          </section>

          {/* Section 4 */}
          <section className="lesson-section">
            <h2 className="section-title">Compile-time Polymorphism: Method Overloading</h2>
            <p>
              Overloading lets a class offer multiple versions of the same operation, each suited to
              a different input type or arity. The compiler resolves which version to call based on
              the argument types at the call site.
            </p>
            <div className="code-block-wrapper">
              <span className="code-lang">Java</span>
              <pre className="code-block"><code>{CODE_OVERLOADING}</code></pre>
            </div>
            <div className="callout callout-warning">
              <strong>Overloading vs. overriding:</strong> Overloading is within a single class and
              resolved at compile time. Overriding is between a superclass and subclass and resolved
              at runtime. They are distinct mechanisms with different rules.
            </div>
          </section>

          {/* Section 5 */}
          <section className="lesson-section">
            <h2 className="section-title">The @Override Annotation</h2>
            <p>
              When overriding a method, always add <code>@Override</code>. It is optional but
              strongly recommended: if you accidentally misspell the method name or use the wrong
              signature, the compiler reports an error immediately rather than silently creating a
              new, unrelated method.
            </p>
            <div className="info-grid">
              <div className="info-card info-card-no">
                <h3>Without @Override</h3>
                <p>
                  A typo in the method name creates a brand-new method. Your code compiles. At
                  runtime, the parent's original version runs — not yours. The bug can be very
                  difficult to trace.
                </p>
              </div>
              <div className="info-card info-card-yes">
                <h3>With @Override</h3>
                <p>
                  The compiler verifies the signature matches a method in the superclass or an
                  interface. If it doesn't, the build fails immediately with a clear error message.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="lesson-section">
            <h2 className="section-title">Key Points</h2>
            <ul className="key-points">
              <li>
                <strong>Runtime polymorphism</strong> (method overriding) is resolved by the JVM
                based on the actual object type, not the reference type.
              </li>
              <li>
                <strong>Compile-time polymorphism</strong> (method overloading) is resolved by the
                compiler based on argument types and count.
              </li>
              <li>
                The declared type of a reference governs what you can call; the actual type governs
                how it runs.
              </li>
              <li>
                Always annotate overriding methods with <code>@Override</code> to catch signature
                errors at compile time.
              </li>
              <li>
                Polymorphism enables general-purpose code: write once against a supertype, and it
                works correctly for all subtypes.
              </li>
            </ul>
          </section>
        </div>

        
      </main>
    </div>
  );
}
